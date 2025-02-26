export const votingContract = {
    address: "0xbB2dca6dcb773eA6d6A4309709bF9f662f4Aac3e",
    abi: [
        {
            type: "function",
            name: "voteLeft",
            stateMutability: "nonpayable",
            inputs: [],
            outputs: []
        },
        {
            type: "function",
            name: "voteRight",
            stateMutability: "nonpayable",
            inputs: [],
            outputs: []
        },
        {
            type: "function",
            name: "getData",
            stateMutability: "view",
            inputs: [],
            outputs: [
                { type: "uint256" }, { type: "uint256" }, { type: "address" },
                { type: "uint256" }, { type: "uint256" }, { type: "address" },
                { type: "uint256" }
            ]
        }
    ]
} as const;
