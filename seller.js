function seller(sellRate){

		this.sellRate = sellRate;

        this.upgrade = function(type, software)
        {   
            switch(type)
            {
                case(1):
                    this.sellRate += .005;
                    return this.getSellerPrice(100, software);
                    break;
                case(2):
                    this.sellRate += .020;
                    return this.getSellerPrice(250, software);
                    break;
                case(3):
                    this.sellRate += .100;
                    return this.getSellerPrice(1000, software);
                    break;
                case(4):
                    this.sellRate += .750;
                    return this.getSellerPrice(5000, software);
                    break;
                case(5):
                    this.sellRate += 4.000;
                    return this.getSellerPrice(25000, software);
                    break;
                case(6):
                    this.sellRate += 20.000;
                    return this.getSellerPrice(100000, software);
                    break;
                case(7):
                    this.sellRate += 150.000;
                    return this.getSellerPrice(500000, software);
                    break;
                case(8):
                    this.sellRate += 1000.000;
                    return this.getSellerPrice(2500000, software);
                    break;
                case(9):
                    this.sellRate += 5000.000;
                    return this.getSellerPrice(10000000, software);
                    break;
                case(10):
                    this.sellRate += 100000.000;
                    return this.getSellerPrice(100000000, software);
                    break;
                default:
                    return 0.00;
                    break;
            }
        }

        this.getBasePrice = function(sellerID)
        {
            switch(sellerID)
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

        this.getSellerPrice = function(basePrice, software)
        {
            return basePrice * (1 - (software / 20.0));
        }
}