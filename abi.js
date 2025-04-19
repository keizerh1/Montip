// abi.js
const MONTIP_ABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tipId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "TipCanceled",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tipId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "unlockTime",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "isProgressive",
                "type": "bool"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "message",
                "type": "string"
            }
        ],
        "name": "TipSent",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tipId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "TipWithdrawn",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tipId",
                "type": "uint256"
            }
        ],
        "name": "calculateWithdrawableAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tipId",
                "type": "uint256"
            }
        ],
        "name": "cancelTip",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllTips",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "sender",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "recipient",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "message",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "unlockTime",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "unlockDelay",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isProgressive",
                        "type": "bool"
                    },
                    {
                        "internalType": "uint256",
                        "name": "releaseRate",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "withdrawnAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "lastWithdrawalTime",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isCanceled",
                        "type": "bool"
                    }
                ],
                "internalType": "struct MonTip.Tip[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getMyTips",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "sender",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "recipient",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "message",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "unlockTime",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "unlockDelay",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isProgressive",
                        "type": "bool"
                    },
                    {
                        "internalType": "uint256",
                        "name": "releaseRate",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "withdrawnAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "lastWithdrawalTime",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isCanceled",
                        "type": "bool"
                    }
                ],
                "internalType": "struct MonTip.Tip[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "nextTipId",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "message",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "unlockDelay",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "isProgressive",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "releaseRate",
                "type": "uint256"
            }
        ],
        "name": "sendTipLocked",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "tips",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "message",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "unlockTime",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "unlockDelay",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "isProgressive",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "releaseRate",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "withdrawnAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "lastWithdrawalTime",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "isCanceled",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tipId",
                "type": "uint256"
            }
        ],
        "name": "withdrawTip",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const MONTIP_ADDRESS = "0xc38e071b01cf4e10A94E3Ab4aa32Ca1f1D590713";
// Tu peux maintenant importer ce fichier dans ton index.html avec :
// <script src="abi.js"></script>
// Et ensuite tu peux instancier ton contrat dans ton script principal :
// const contract = new ethers.Contract(MONTIP_ADDRESS, MONTIP_ABI, signer);
