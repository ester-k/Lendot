export class LoanRequest {
    constructor(requestId, loanerId, offers, loanType, status, propertyAddress, propertyType, purpose, closeDate, price, rehab, estimated, credit) {
        this.loanerId = loanerId;
        this._id = requestId;
        this.loanType = loanType;
        this.propertyAddress = propertyAddress;
        this.propertyType = propertyType;
        this.purpose = purpose;
        this.closeDate = closeDate;
        this.price = price;
        this.rehab = rehab;
        this.estimated = estimated;
        this.credit = credit;
        this.status = status;
        this.offers = offers;

    }
}