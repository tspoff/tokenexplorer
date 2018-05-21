const tokens = [
    {
        'name': 'Status Network',
        'address': '0x744d70FDBE2Ba4CF95131626614a1763DF805B9E',
        'icon': 'SNT'
    },
    {
        'name': 'EOS',
        'address': '0x86Fa049857E0209aa7D9e616F7eb3b3B78ECfdb0',
        'icon': 'EOS'
    },
];

const getTokenNameFromAddress = (address) => {
    for (let token of tokens) {
        if (token.address === address) {
            return token.name;
        }
    }

    return "";
}

const getTokenIconByAddress = (address) => {
    for (let token of tokens) {
        if (token.address === address) {
            return token.icon + ".png";
        }
    }

    return "";
}

const getTokenList = () => {
    return tokens;
}

export { getTokenNameFromAddress, getTokenIconByAddress, getTokenList, tokens };