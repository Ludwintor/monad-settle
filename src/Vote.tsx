import { PropsWithChildren } from "react";
import "./Vote.css";

interface VoteProps extends PropsWithChildren {
  buttonText: string;
  current: bigint;
  total: bigint;
  lastVoter?: string;
  onClick?: () => void;
}

function Vote(props: VoteProps) {
  return (
    <div className="vote">
      <button onClick={props.onClick}>{props.buttonText}</button>
      <span>{`${props.current} points`}</span>
      <span className="secondary">{`${props.total} total`}</span>
      {props.lastVoter && <span className="secondary">{`last voter ${props.lastVoter}`}</span>}
    </div>
  );
}

export default Vote;