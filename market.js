function market(sellVal, buyVal, trend)
{	
	this.sellValue = sellVal;
	this.buyValue  = buyVal;
	this.trend     = trend;

	this.updatePrice = function()
	{
		this.sellValue = this.sellValue + this.trend;
		if(this.sellValue < 1)
		{
			this.sellValue = 1;
		}
		
		this.buyValue  = this.buyValue  + this.trend;
		if(this.buyValue < 1)
		{
			this.buyValue = 1;
		}	
	}

	this.newTrend = function(googfu)
	{
		var ran = Math.random();
		ran *= (1 +(googfu/20.0));
		//console.log(ran);
		// 5% chance of super high up trend
		if(ran > 0.95)
		{
			this.trend = 3;
		}
		// 10% chance of high trend
		else if(ran > 0.85 && ran < 0.95)
		{
			this.trend = 1;
		}
		// 25% of small up trend
		else if(ran > 0.6 && ran < 0.85)
		{
			this.trend = 0.5;
		}
		// 40% of small negative 
		else if(ran > 0.2 && ran < 0.6)
		{
			this.trend = -0.5
		}
		// 15% chance of somewhat negative
		else if(ran > 0.05 && ran < 0.2)
		{
			this.trend = -1;
		}
		// 5% chance of super negative
		else if(ran > 0 && ran < 0.05)
		{
			this.trend = -3;
		}

	}
}