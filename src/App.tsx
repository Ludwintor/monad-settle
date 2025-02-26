import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import Vote from './Vote'
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { votingContract } from './libs/contracts';
import { useModal } from 'connectkit';
import { formatTime } from './libs/utils';

function App() {
  const [resetText, setResetText] = useState("");
  const resetInterval = useRef<number>(undefined);

  const { isConnected } = useAccount();
  const { setOpen } = useModal();

  const { data: votingData } = useReadContract({
    ...votingContract,
    functionName: "getData",
    query: {
      refetchInterval: 3000
    }
  });

  const [left, leftTotal, lastLeftVoter, right, rightTotal, lastRightVoter, nextReset] =
    votingData || [0n, 0n, undefined, 0n, 0n, undefined, undefined];

  useEffect(() => {
    if (!nextReset)
      return;

    const repeat = () => {
      const now = Math.floor(Date.now() / 1000);
      if (now >= nextReset) {
        setResetText("waiting next vote");
        clearInterval(resetInterval.current);
        return;
      }
      const time = Number(nextReset) - now;
      setResetText(formatTime(time));
    }
    resetInterval.current = setInterval(repeat, 1000);
    repeat();
    return () => clearInterval(resetInterval.current);
  }, [nextReset, setResetText, resetInterval]);

  const { writeContract } = useWriteContract()

  const handleVoteLeft = useCallback(() => {
    if (!isConnected) {
      setOpen(true);
      return;
    }
    writeContract({
      ...votingContract,
      functionName: "voteLeft"
    });
  }, [writeContract, isConnected, setOpen]);

  const handleVoteRight = useCallback(() => {
    if (!isConnected) {
      setOpen(true);
      return;
    }
    writeContract({
      ...votingContract,
      functionName: "voteRight"
    });
  }, [writeContract, isConnected, setOpen]);

  const sum = left + right;
  const heightPercent = sum !== 0n ? Number(right * 1000n / sum) / 10 : 50;

  return (
    <>
      <div className='text'>
        <h1>Let's settle this - which tokens are better?</h1>
        <p>{`Next reset in: ${resetText}`}</p>
        <div className='footer'>
          {"Built with <3 by ludwintor for Monad"}
        </div>
      </div>
      <div className='sides'>
        <Vote 
          buttonText='+1 utility'
          current={left}
          total={leftTotal}
          lastVoter={lastLeftVoter}
          onClick={handleVoteLeft}
        />
        <Vote
          buttonText='+1 meme'
          current={right}
          total={rightTotal}
          lastVoter={lastRightVoter}
          onClick={handleVoteRight}
        />
      </div>
      <div className='diff'>
        <div className='top'>Utility</div>
        <div className='bot' style={{height: `${heightPercent}%`}}>Meme</div>
      </div>
      <a className='github' href='https://github.com/Ludwintor/monad-settle' target='_blank' rel='noopener'>
        <img src='/github-mark.svg'/>
      </a>
    </>
  )
}

export default App;
