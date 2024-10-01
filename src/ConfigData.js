// //Smart Contract ABI
// export const contractABI = [
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "receiver",
//                 "type": "address"
//             },
//             {
//                 "indexed": false,
//                 "internalType": "string",
//                 "name": "hash",
//                 "type": "string"
//             }
//         ],
//         "name": "CertificateStored",
//         "type": "event"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "",
//                 "type": "address"
//             }
//         ],
//         "name": "certificates",
//         "outputs": [
//             {
//                 "internalType": "string",
//                 "name": "",
//                 "type": "string"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "getCertificate",
//         "outputs": [
//             {
//                 "internalType": "string",
//                 "name": "",
//                 "type": "string"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "_address",
//                 "type": "address"
//             }
//         ],
//         "name": "getCertificateByAddress",
//         "outputs": [
//             {
//                 "internalType": "string",
//                 "name": "",
//                 "type": "string"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "recipient",
//                 "type": "address"
//             },
//             {
//                 "internalType": "string",
//                 "name": "hash",
//                 "type": "string"
//             }
//         ],
//         "name": "storeCertificate",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     }
// ];

export const contractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "hash",
				"type": "string"
			}
		],
		"name": "CertificateStored",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "certificates",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCertificate",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getCertificateByAddress",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
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
				"name": "hash",
				"type": "string"
			}
		],
		"name": "storeCertificate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

//Contract Address Variable
export const contractAddress = '0x622f06febb8250fa6174cba0263dafdc77cd9e51';

   // studentData.js
export const dataset = {
	'P02KU22S126001': '0x888b7fF88D4609BEa4D2C8E5ab789bDdb39bED2b',
	'P02KU22S126002': '0x5E9E7dBD0C2bdb1cF8E64520B1Ea5cdeBC2D033c',
	'P02KU22S126003': '0x45579f14ca3814fe2E455127F98544946ECeb20E',
	'P02KU22S126004': '0x1dDae5278d74c9796613A735aAfE71768B91DA39',
	'P02KU22S126005': '0x997755A8284B6cF71fDC1d553Dd78A9Ed810558a',
	'P02KU22S126006': '0xC0E0e8B065E107046373636fd2426D4Cb7B4D476',
	'P02KU22S126007': '0xE7dE4eae997E3eB269D8D478Eb5F8297c5eADb69',
	'P02KU22S126008': '0xAd55c1C7BaCD99A82Ab55A4E0F9fc8689305E97e',
	'P02KU22S126009': '0x50E351A7d0A3872964cE8695c77E7CD15FFc803C',
	'P02KU22S126010': '0xeF7cA973E31f6Af0AD82685e54d3a20284B82c3A',
	'P02KU22S126011': '0xeFfdFde1E33a7e20e398e92AA5388b4815E2AE4B',
	'P02KU22S126012': '0xE376d5804E26090396846008db7a099b685D41A9',
	'P02KU22S126013': '0x8Cf9Ba7667Ee8B15A2FA1657cc02e0Dfb00a2AD3',
	'P02KU22S126014': '0xea41614f8b1eFA040b83bC30d53DF6a5b6CDcbFD',
	'P02KU22S126015': '0x97367DBb2AE18A41a4940f27A1AB2c56CC3A5F3f',
	'P02KU22S126016': '0xf201ea1E16147604D49405550fa2BAD6e56c9E15',
	'P02KU22S126017': '0x7F047889d6BE58607A6248c4F41f1061aE50dAe5',
	'P02KU22S126018': '0x166403BFb2749e0ef18C888a84a3e657DF9976D5',
	'P02KU22S126019': '0x14e2696820Ca4a29d8f23350BC3f0eC9a24cC546',
	'P02KU22S126020': '0xf7c642D0857a4342Ddc504f86A795D41E27D709a',
	'P02KU22S126021': '0x27ED70d1765141B799bE11aaeC007536Dc24Aa84',
	'P02KU22S126022': '0xeFC45f47C6C8E10568dbc5d93F542CcC2dcADa92',
	'P02KU22S126023': '0xf128C1e8C080D15D18Cbb8eb76E38e96296328b2',
	'P02KU22S126024': '0x5A908a9986101b8B7e9EC054A4b082Fda51b307c',
	'P02KU22S126025': '0x790D1D466697c7377F3a7C0881E80aA78f269a6e',
	'P02KU22S126026': '0x07032358c63aC83AE84a57B09ec2f38ffb3A33F2',
	'P02KU22S126027': '0x5bDc9Ff770fE90d5784f797641e3E095AD11c607',
	'P02KU22S126028': '0x49D8716AC2e7665703fD590c98edB1c75F5DF253',
	'P02KU22S126029': '0xa541d31C541C2CB20a89D6b223D9332E53252184',
	'P02KU22S126030': '0x162F3272e60872E29525E0950b6399F4893726A8',
	'P02KU22S126031': '0x0584265C0D99a34F0498D59D542eC20CbA8E835C',
	'P02KU22S126032': '0xdF045eB8fA99283D145199c355A167DE1987975e',
	'P02KU22S126033': '0xeEe71a1f271FCBFF9E932EC6e0D2EeEd93E99749',
	'P02KU22S126034': '0x6EE1a4F60bF62AC1Fa6D332a75DD88d88bB93A81',
	'P02KU22S126035': '0xd7e8C3c1A883F11dB2aE14C4C009E05789aFB732',
	'P02KU22S126036': '0xaEb04ba59b8654Dea6Dd55308d83683af6556B15',
	'P02KU22S126037': '0x60f2c4e17E2E83af79A99A3B1abf9d37D30d5A7B',
	'P02KU22S126038': '0x98572632963ad8d9E60434790670f493A8b15066',
	'P02KU22S126039': '0x60ADc17251F65a875734A49c8f5Dc1A7137DFC00',
	'P02KU22S126040': '0x3987C122944d538F1cdAaDD969C8d42B8321eCfA',
	'P02KU22S126041': '0xb5E42132BdDEd05B28302e718F4D9a3f9Be36EFb',
	'P02KU22S126042': '0x347AF2f8CC38Fc95277548cFe98020691703EdB0',
	'P02KU22S126043': '0x8c1c7Df2aE3aB099DD113ba21717Cfa378290ac2',
	'P02KU22S126044': '0xDbbDA73B5688A0ed67F08797EbBb4823Bc17859E',
	'P02KU22S126045': '0xb9bc2Ca762Eee3a977f84D075Cc0dBeE6a2033C9',
	'P02KU22S126046': '0x02B48D036c7Ee8F5A64f688ED5dF795eCF9B25e5',
	'P02KU22S126047': '0xDE74240Cd02C982d21e3D2Cc4233f407C0AB6CcE',
	'P02KU22S126048': '0xF43664631C72163937dAF2ae61cbD57E794Bd43e',
	'P02KU22S126049': '0x3042cbcb5a720C4A66caD0D8aE9A9e991F7B6A88'
  };
  

