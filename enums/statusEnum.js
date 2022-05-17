const LoanStatusEnum = Object.freeze({
    //loan
    "Offers In Progress": { controller: "View Actions", action: { func: "navigateAction", prop: { route: "/loanerScreen/actions" } }, bgcolor: "#FDE8EE", color: "#EC255A" },

    "Request in Progress": { controller: "Complete Request", action: { func: "navigateAction", prop: { route: "/createRequest" } }, bgcolor: "#F58FAB", color: "white", icon: "complete_req.svg" },
    "Waiting For Offers": { controller: "View Loan", action: { func: "openPopup", prop: { popup: "openViewLoan" } }, bgcolor: "#FDE8EE", color: "#EC255A" },
    // "Action Required": { controller: "Upload Documents", action: { func: "navigateAction", prop: { route: "/uploadDocuments" } }, bgcolor: "#EC255A", color: "white", icon: "upload_doc.svg" },
    "Offers Available": { controller: "View Offers", action: { func: "navigateAction", prop: { route: "/loanerScreen/offers" } }, bgcolor: "#F8B0C3", color: "#EC255A", icon: "accept_offer.svg" },
    // "Fee Required": { controller: "Transfer Payment", action: "payment", bgcolor: "#F15B83", color: "white" },
    "Completed": { controller: "View Details", action: { func: "openPopup", prop: { popup: "openCompleteRequest" } }, bgcolor: "#161853", color: "white" },
    //offers
    "Offers to Accept": { controller: "Accept Offer", action: { func: "navigateAction", prop: { route: "/loanerScreen/offers" } }, icon: "accept_offer.svg" },
    "Upload Documents": { controller: "Upload Documents", action: { func: "navigateAction", prop: { route: "/uploadDocuments" } }, bgcolor: "#EC255A", color: "white", icon: "upload_doc.svg" },


})
export default LoanStatusEnum;