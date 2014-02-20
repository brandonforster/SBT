function player(name, major){
	this.name=name;
	this.major=major;
	//this.hardware=hardware;
	//this.software=software;
	//this.algo=algo;
	//this.googfu=googfu;
};

function baseStats(player){
	if(player.major==='CS'){
		player.fullMajor='Computer Science';
		player.hardware=6;
		player.software=7;
		player.algo=7;
		player.googfu=7;
	}
	if(player.major==='CPE'){
		player.fullMajor='Computer Engineering';
		player.hardware=8;
		player.software=5;
		player.algo=6;
		player.googfu=7;
	}
	if(player.major==='EE'){
		player.fullMajor='Electrical Engineering';
		player.hardware=9;
		player.software=4;
		player.algo=5;
		player.googfu=7;
	}
	if(player.major==='IT'){
		player.fullMajor='Infomation Technology';
		player.hardware=1;
		player.software=1;
		player.algo=1;
		player.googfu=10;
	}
};


