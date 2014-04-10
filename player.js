function player(name, major){
	this.name=name;
	this.major=major;
	
};

function baseStats(player){
	if(player.major==='CS'){
		player.fullMajor='Computer Science';
		player.hardware=1;
		player.software=4;
		player.algo=7;
		player.googfu=3;
	}
	if(player.major==='CPE'){
		player.fullMajor='Computer Engineering';
		player.hardware=5;
		player.software=5;
		player.algo=3;
		player.googfu=2;
	}
	if(player.major==='EE'){
		player.fullMajor='Electrical Engineering';
		player.hardware=7;
		player.software=1;
		player.algo=1;
		player.googfu=6;
	}
	if(player.major==='IT'){
		player.fullMajor='Infomation Technology';
		player.hardware=2;
		player.software=2;
		player.algo=1;
		player.googfu=10;
	}
};


