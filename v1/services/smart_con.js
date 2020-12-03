var {contract_ABI,contract_address} = require('../../config/sys_vari')

var contract_abi = contract_ABI
var contract_address = contract_address

var Dapp = {
    Dep : async () => {

		Dapp.Web3 = require ('web3');
		Dapp.Tx = require('ethereumjs-tx').Transaction
  
		Dapp.web3 = new Dapp.Web3(new Dapp.Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/04b7fadf93f143c48b2b0cb3a7c9c4ee")) //rinkeby test network
		//Dapp.web3 = new Dapp.Web3(new Dapp.Web3.providers.HttpProvider("https://ropsten.infura.io/v3/04b7fadf93f143c48b2b0cb3a7c9c4ee")) //ropsten test network

		Dapp.contract = new Dapp.web3.eth.Contract(contract_abi,contract_address)
		// console.log(Dapp.contract)
	},

	create_acc : async (data)=>{
		accDet = Dapp.web3.eth.accounts.create()
        account_add = accDet.address
        account_key_1 = accDet.privateKey
        account_key = account_key_1.slice(2)
        // console.log(accDet)
        account_bal = await Dapp.web3.eth.getBalance(account_add)
        // console.log(account_bal)
	},
	
	add_user: async (_id,_type,per_Address,per_key,data)=>{
		const contractFunction = await Dapp.contract.methods.Add_User(_id,_type,per_Address); // Here you can call your contract functions
		await Dapp.make_payment(contractFunction,per_Address,per_key,(err,recipt)=>{
			if (err){
				data(err,receipt)
			}else{
				// console.log(recipt)
				data(null,recipt)
			}
		})
	},

	can_doc_fun: async (_id,_user,_type,_option,_address,_key,data)=>{
		const contractFunction = await Dapp.contract.methods.can_doc_fun(_id,_user,_type,_option); // Here you can call your contract functions
		await Dapp.make_payment(contractFunction,_address,_key,(err,recipt)=>{
			if (err){
				data(err,receipt)
			}else{
				// console.log(recipt)
				data(null,recipt)
			}
		})
	},

	off_doc_fun: async (_id,_user,_type,_option,_address,_key,data)=>{
		const contractFunction = await Dapp.contract.methods.off_doc_fun(_id,_user,_type,_option); // Here you can call your contract functions
		await Dapp.make_payment(contractFunction,_address,_key,(err,recipt)=>{
			if (err){
				data(err,receipt)
			}else{
				// console.log(recipt)
				data(null,recipt)
			}
		})
	},

	make_payment : async (contractFunction,per_Address,per_key,responce) =>{
		const functionAbi = contractFunction.encodeABI();
  
		let estimatedGas;
		let nonce;
  
		// console.log("Getting gas estimate");
  
		contractFunction.estimateGas({from: per_Address}).then((gasAmount) => {
		  estimatedGas = gasAmount.toString(16);
  
		  // console.log("Estimated gas: " + estimatedGas);
  
		  Dapp.web3.eth.getTransactionCount(per_Address).then(async(_nonce) => {
			  nonce = _nonce.toString(16);
  
			  console.log("Nonce: " + nonce);
  
			  const txParams = {
			  gas: gasAmount ,
			  gasPrice: "0x4a817c800",
			  gasLimit: 300000,
			  //value: 1000000,
			  to: contract_address,
			  data: functionAbi,
			  from: per_Address,
			  nonce: '0x' + nonce
			  };
  
			  const tx = new Dapp.Tx(txParams,{'chain':'rinkeby'});
			  tx.sign(Buffer.from(per_key,'hex')); // Transaction Signing here  {chain:'rinkeby', hardfork: 'petersburg'}
  
			  const serializedTx = tx.serialize();
			  
			  await Dapp.web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', receipt => {
			  // console.log(receipt);
			  responce(null,receipt)
			  })
			})
		})
	},

	get_detail : async (_id,responce) =>{
		await Dapp.contract.methods.get_detail(_id).call().then(res=>{
			// console.log(res)
			responce(res)
		})	
	},

	read_doc : async (_id,responce)=>{
		await Dapp.contract.methods.read_doc(_id).call().then(res=>{
			responce(res)
		})
	},

	off_List : async (_id,responce)=>{
		await Dapp.contract.methods.off_List(_id).call().then(res=>{
			responce(res)
		})
	}
}

module.exports = Dapp;