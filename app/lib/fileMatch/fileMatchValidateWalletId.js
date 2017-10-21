
module.exports = function testForWalletId(a, b) {
    var suggestedWallet = [];
    
    suggestedWallet.push(a.slice(0, 4)) //P_Nz
    a.slice(4, 5) == b.slice(4, 5) ? suggestedWallet.push(a.slice(4, 5)) : suggestedWallet.push("I");
    a.slice(5, 6) == b.slice(5, 6) ? suggestedWallet.push(a.slice(5, 6)) : suggestedWallet.push("z");
    a.slice(6, 7) == b.slice(6, 7) ? suggestedWallet.push(a.slice(6, 7)) : /[A-Z]/.test(a.slice(6, 7)) ? suggestedWallet.push("M") : suggestedWallet.push("z");      
    a.slice(7, 8) == b.slice(7, 8) ? suggestedWallet.push(a.slice(7, 8)) : /[A-Z]/.test(a.slice(7, 8)) ? suggestedWallet.push("T") : suggestedWallet.push("j"); 
    
    suggestedWallet.push(a.slice(8, 9));
    suggestedWallet.push(a.slice(9, 10));

    a.slice(10, 11) == b.slice(10, 11) ? suggestedWallet.push(a.slice(10, 11)) : /[A-Z]/.test(a.slice(10, 11)) ? suggestedWallet.push("M") : suggestedWallet.push("z");      
    a.slice(11, 12) == b.slice(11, 12) ? suggestedWallet.push(a.slice(11, 12)) : /[A-Z]/.test(a.slice(11, 12)) ? suggestedWallet.push("T") : suggestedWallet.push("j"); 
    
    suggestedWallet.push(a.slice(12, 13));

    a.slice(13, 18) == b.slice(13, 18) ? suggestedWallet.push(a.slice(13, 18)) : suggestedWallet.push("FMTM4");

    a.slice(18, 19) == b.slice(18, 19) ? suggestedWallet.push(a.slice(18, 19)) : suggestedWallet.push("M");
    a.slice(19, 20) == b.slice(19, 20) ? suggestedWallet.push(a.slice(19, 20)) : /[A-Z]/.test(a.slice(19, 20)) ? suggestedWallet.push("T") : suggestedWallet.push("j");    
    
    suggestedWallet.push(a.slice(20, 21));
    suggestedWallet.push(a.slice(21, 22));

    a.slice(22, 23) == b.slice(22, 23) ? suggestedWallet.push(a.slice(22, 23)) : suggestedWallet.push("M");
    a.slice(23, 24) == b.slice(23, 24) ? suggestedWallet.push(a.slice(23, 24)) : /[A-Z]/.test(a.slice(23, 24)) ? suggestedWallet.push("T") : suggestedWallet.push("z");    
    
    suggestedWallet.push(a.slice(24, 25));
    suggestedWallet.push(a.slice(25, 26));

    a.slice(26, 27) == b.slice(26, 27) ? suggestedWallet.push(a.slice(26, 27)) : suggestedWallet.push("O");
    a.slice(27, 28) == b.slice(27, 28) ? suggestedWallet.push(a.slice(27, 28)) : suggestedWallet.push("S");
    
    a.slice(28, 29) == b.slice(28, 29) ? suggestedWallet.push(a.slice(28, 29)) : suggestedWallet.push("4");
    a.slice(29, 30) == b.slice(29, 30) ? suggestedWallet.push(a.slice(29, 30)) : suggestedWallet.push("M");

    a.slice(30, 31) == b.slice(30, 31) ? suggestedWallet.push(a.slice(30, 31)) : suggestedWallet.push("M");
    a.slice(31, 32) == b.slice(31, 32) ? suggestedWallet.push(a.slice(31, 32)) : /[A-Z]/.test(a.slice(31, 32)) ? suggestedWallet.push("T") : suggestedWallet.push("j");    

    suggestedWallet.push(a.slice(32, 33));
    suggestedWallet.push(a.slice(33, 34));
    
    return suggestedWallet.join("");
}