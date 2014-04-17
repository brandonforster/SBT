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
                default:
                    return 0.00;
            }
        }

        this.getSellerPrice = function(basePrice, software)
        {
            return basePrice * (1 - (software / 20.0));
        }
}