pragma solidity >=0.5.0 <0.7.0;

contract getCertified {
    
    struct verifiedState{
        uint ID;
        staeveri state;
        bool update;
        uint apprBy;
    }
    
    struct Candidate {
        string Name;
        address userAddress;
        uint ID;
        uint eduCerNum;
        uint workExpNum;
        uint certiNum;
        uint projNum;
        uint kycId;
        uint [] eduQuaification;
        uint [] workExp;
        uint [] certficate;
        uint [] project ;
    }
    
    struct officer{
        string name;
        address userAddress;
        uint ID;
        uint offType;
    }
    
    enum staeveri{WORKING,PENDING,APPROVED,REJECTED}
    
    mapping (uint => Candidate) public candiLidt;
    mapping (uint => verifiedState) public docList;
    mapping (uint => officer) public offList;
    
    modifier checkRegir (uint _id, uint _type){
        // to block multiple registration
        if (_type == 1){
            require(candiLidt[_id].ID == 0,"allready register");
        }else{
            if (_type == 2 || _type == 3 ||_type == 4){
                require(offList[_id].ID == 0,"allready register");
            }
        }
        _;
    }
    modifier verifCheck (uint _id,address _address){
        // to insure that owner is only alowed to make change
        require(offList[_id].userAddress ==_address,"not an authorised person");
        _;
    }
    modifier indiCheck(uint _id,address _address){
        //to insure that any document addition is made from his account only
        require(candiLidt[_id].userAddress == _address,"you can't make changes thought othere account");
        _;
    }
    
    function addIndividual(uint _ID,uint _type,string memory _name, address _address) public {
        require (candiLidt[_ID].ID == 0 ,'your document is allready upload');
        if (_type == 1){
            candiLidt[_ID].Name = _name;
            candiLidt[_ID].userAddress = _address;
            candiLidt[_ID].ID = _ID;
            candiLidt[_ID].eduCerNum = 0;
            candiLidt[_ID].workExpNum = 0;
            candiLidt[_ID].certiNum = 0;
        }else{
            if (_type == 2 || _type == 3 ||_type == 4){
                offList[_ID] = officer(_name,_address,_ID,_type);
            }
        }
        
    }
    
    function addKYC(uint _ID,uint _kycId) indiCheck(_ID,msg.sender) public {
        require (candiLidt[_ID].kycId == 0 ,'your document is allready upload');
        candiLidt[_ID].kycId = _kycId;
    }
    
    function addDocument (uint _ID,uint _type,uint _certifID) indiCheck(_ID,msg.sender)public{
        require (docList[_certifID].ID == 0 ,'your document is allready upload');
        // to check the document in the id of the individual
        if (_type == 1){
            candiLidt[_ID].eduCerNum ++;
            candiLidt[_ID].eduQuaification[candiLidt[_ID].eduCerNum] = _certifID;
            docList[_certifID].ID = _ID;
            docList[_certifID].state = staeveri.WORKING ;
            docList[_certifID].update = true;
        }else{
            if (_type == 2){
                candiLidt[_ID].workExpNum ++;
                candiLidt[_ID].workExp.push(_certifID);
                docList[_certifID].ID = _ID;
                docList[_certifID].state = staeveri.WORKING;
                docList[_certifID].update = true;
            }else{
                if (_type == 3){
                    candiLidt[_ID].certiNum ++;
                    candiLidt[_ID].certficate.push(_certifID);
                    docList[_certifID].ID = _ID;
                    docList[_certifID].state = staeveri.WORKING;
                    docList[_certifID].update = true;
                }else{
                    if (_type == 4){
                    candiLidt[_ID].projNum ++;
                    candiLidt[_ID].project.push(_certifID);
                    docList[_certifID].ID = _ID;
                    docList[_certifID].state = staeveri.WORKING;
                    docList[_certifID].update = true;
                    }
                }
            } 
        }
    }
    
    function verifApply(uint _ID,uint _certifID) indiCheck(_ID,msg.sender)public{
        require(docList[_certifID].update == true,"not appled to make theis operation of allying to approve");
        //add to the list of perticular aproving authority to approve the document
        require(docList[_certifID].ID == _ID,"this is not your document");
        docList[_certifID].update = false;
    }
    
    function checkCerState(uint _certifID) public view returns(staeveri){
        // to check wether the document is approved or not
        staeveri checkStat ;
        checkStat = docList[_certifID].state;
        return(checkStat);
    }
    
    function addlyUpdate (uint _ID,uint _certifID) indiCheck(_ID,msg.sender)public{
        require(docList[_certifID].ID == _ID,"this is not your document");
        // add the certifID to the update list where the verifier will allow to update of cancel the request
        docList[_certifID].state = staeveri.WORKING;
    }
    
    function acceptRequest (uint _ID, uint _appID) verifCheck(_ID,msg.sender) public{
        // verifier will allow to update document by individual
        require(offList[_ID].offType == 4,"not an authorised person");
        require (docList[_appID].update == false,'document allredy in edit state');
        docList[_appID].update = true;
        docList[_appID].apprBy = _ID;
    }
    
    function veriDoc (uint _ID,uint _appID,uint _state) verifCheck(_ID,msg.sender) public {
        if(_state == 1){
            docList[_appID].state = staeveri.APPROVED;
            docList[_appID].apprBy = _ID;
        }else{
            if(_state == 2){
                docList[_appID].state = staeveri.REJECTED;
                docList[_appID].apprBy = _ID;
            }
        }
        
    } 
    
    function delCertificate (uint _ID,uint _type,uint _certifID) indiCheck(_ID,msg.sender)public {
        require(docList[_certifID].ID == _ID,"this is not your document");
        //to delete certificate
        delete docList[_certifID];
        
        //remove the certificate from the list of certificate o individual
        uint max;
        uint i;
        if (_type == 1) {
            max = candiLidt[_ID].eduCerNum;
            for( i = 1 ; i <= max ;i++){
                if ( candiLidt[_ID].eduQuaification[i] == _certifID ) {
                    
                    delete docList[candiLidt[_ID].eduQuaification[i]];
                    delete candiLidt[_ID].eduQuaification[i];
                    
                }
            }
        }
        if (_type == 2) {
            max = candiLidt[_ID].workExpNum;
            for( i = 1 ; i <= max ;i++){
                if ( candiLidt[_ID].workExp[i] == _certifID ) {
                    
                    delete docList[candiLidt[_ID].workExp[i]];
                    delete candiLidt[_ID].workExp[i];
                    
                }
            }
        }
        if (_type == 3) {
            max = candiLidt[_ID].certiNum;
            for( i = 1 ; i <= max ;i++){
                if ( candiLidt[_ID].certficate[i] == _certifID ) {
                    
                    delete docList[candiLidt[_ID].certficate[i]];
                    delete candiLidt[_ID].certficate[i];
                    
                }
            }
        }
        
    }
}