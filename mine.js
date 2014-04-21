

function mine(mineRate){

		this.mineRate = mineRate;

        this.upgrade = function(type, hardware)
        {   
            switch(type)
            {
                case(1):
                    this.mineRate += .005;
                    return this.getMinerPrice(100, hardware);
                    break;
                case(2):
                    this.mineRate += .020;
                    return this.getMinerPrice(250, hardware);
                    break;
                case(3):
                    this.mineRate += .100;
                    return this.getMinerPrice(1000, hardware);
                    break;
                case(4):
                    this.mineRate += .750;
                    return this.getMinerPrice(5000, hardware);
                    break;
                case(5):
                    this.mineRate += 4.000;
                    return this.getMinerPrice(25000, hardware);
                    break;
                case(6):
                    this.mineRate += 20.000;
                    return this.getMinerPrice(100000, hardware);
                    break;
                case(7):
                    this.mineRate += 150.000;
                    return this.getMinerPrice(500000, hardware);
                    break;
                case(8):
                    this.mineRate += 1000.000;
                    return this.getMinerPrice(2500000, hardware);
                    break;
                case(9):
                    this.mineRate += 5000.000;
                    return this.getMinerPrice(10000000, hardware);
                    break;
                case(10):
                    this.mineRate += 100000.000;
                    return this.getMinerPrice(100000000, hardware);
                    break;
                default:
                    return 0.00;
                    break;
            }
        }

        this.getBasePrice = function(minerID)
        {
            switch(minerID)
            {
                case(1):
                    return 100.00;
                    break;
                case(2):
                    return 250.00;
                    break;
                case(3):
                    return 1000.00;
                    break;
                case(4):
                    return 5000.00;
                    break;
                case(5):
                    return 25000.00;
                    break;
                case(6):
                    return 100000.00;
                    break;
                case(7):
                    return 500000.00;
                    break;
                case(8):
                    return 2500000.00;
                    break;
                case(9):
                    return 10000000.00;
                    break;
                case(10):
                    return 100000000.00;
                    break;
                default:
                    return 0.00;
            }
        }

        this.getMinerPrice = function(basePrice, hardware)
        {
            return basePrice * (1 - (hardware / 20.0));
        }
}
