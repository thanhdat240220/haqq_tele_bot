const { Telegraf } = require('telegraf');
const axios = require('axios').default;

const bot = new Telegraf('<your_token>');

const inlineKeyboardWalletCommands = {
    inline_keyboard: [
        [{
            text: "Add",
            callback_data: 'add'
        }, {
            text: "Delete",

            callback_data: 'delete'
        }, {
            text: "Export",
            callback_data: 'export'
        }, {
            text: "Import",
            callback_data: 'import'
        }, {
            text: "Flags",
            callback_data: "flags-wallet"
        }]
    ]
};

const inlineKeyboardTxCommands = {
    inline_keyboard: [
        [{
            text: "Send",
            callback_data: 'send'
        }, {
            text: "Delegate",
            callback_data: 'delegate'
        }, {
            text: "Redelegate",
            callback_data: 'redelegate'
        }, {
            text: "Unbond",
            callback_data: 'unbond'
        }]
    ],
};



bot.command('start', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, `
    - Hello there! Welcome to haqq help bot.
- You can use <b>/wallet</b> to get tips about using the command with wallet in haqq.
- You can use <b>/tx</b> to get an example about using the command with transactions in haqq.
- You can use <b>/validator valoper_address</b> to check validator status.
    `, {
        parse_mode: 'html'
    });
});

bot.command('wallet', ctx => {
    let msg = `Select your command you are want impact with wallet`;
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, msg, {
        reply_markup: inlineKeyboardWalletCommands
    });
});
bot.command('tx', ctx => {
    let msg = `Select your command you are want impact with validator`;
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, msg, {
        reply_markup: inlineKeyboardTxCommands
    });
});

bot.action('add', ctx => {
    let msg = `Add an encrypted private key, encrypt it, and save to <b>wallet_name</b> file.

Usage: <b>haqq keys add wallet_name  [flags]</b>
Example: <b>haqq keys add jeffjack_wallet</b>
`;
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, msg, {
        reply_markup: inlineKeyboardWalletCommands,
        parse_mode: 'html'
    });
});
bot.action('delete', ctx => {
    let msg = `Delete the given keys.

Usage: <b>haqq keys delete wallet_name  [flags]</b>
Example: <b>haqq keys delete jeffjack_wallet</b>
`;
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, msg, {
        reply_markup: inlineKeyboardWalletCommands,
        parse_mode: 'html'
    });
});
bot.action('import', ctx => {
    let msg = `Import private keys into the local keybase.

Usage: <b>haqqd keys import wallet_name key_file  [flags]</b>
Example: <b>haqqd keys import  jeffjack_wallet jeffjack_wallet.json</b>
`;
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, msg, {
        reply_markup: inlineKeyboardWalletCommands,
        parse_mode: 'html'
    });
});
bot.action('export', ctx => {
    let msg = `Import private keys into the local keybase.

Usage: <b>haqqd keys import wallet_name  [flags]</b>
Example: <b>haqqd keys import  jeffjack_wallet</b>
`;
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, msg, {
        reply_markup: inlineKeyboardWalletCommands,
        parse_mode: 'html'
    });
});
bot.action('flags-wallet', ctx => {
    let msg = `<b>
--Flags
+ -h, --help: help for keys.
+ --keyring-dir string: The client Keyring directory; if omitted, the default 'home' directory will be used.
+ --output string: Output format (text|json) (default "text")
</b>
`;
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, msg, {
        reply_markup: inlineKeyboardWalletCommands,
        parse_mode: 'html'
    });
});

bot.action('send', ctx => {
    let msg = `
Send funds from one account to another.

Usage: <b>haqqd tx bank send [from_key_or_address] [to_address] [amount] [flags]</b>
Example: <b>haqqd  tx bank send haqq1n6qmmuu7gkwcfyfx6dkwlzgpj25egvgvdswxy9 haqq1g60c6eh54cs758e3x63uhmcm3rgyu2cshdjg98 1islm --chain-id haqq_54211-2 --fees 20aislm -y</b>
`;
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, msg, {
        reply_markup: inlineKeyboardTxCommands,
        parse_mode: 'html'
    });
});

bot.action('delegate', ctx => {
    let msg = `
Delegate liquid tokens to a validator.

Usage: <b>haqqd tx staking delegate [validator-addr] [amount] [flags]</b>
Example: <b>haqqd tx staking delegate haqqvaloper1n6qmmuu7gkwcfyfx6dkwlzgpj25egvgvpjzgqy 1silm</b>
`;
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, msg, {
        reply_markup: inlineKeyboardTxCommands,
        parse_mode: 'html'
    });
});

bot.action('redelegate', ctx => {
    let msg = `
Redelegate liquid tokens from one validator to another.

Usage: <b>haqqd tx staking redelegate [src-validator-addr] [dst-validator-addr] [amount] [flags]</b>
Example: <b>haqqd tx staking delegate haqqvaloper1n6qmmuu7gkwcfyfx6dkwlzgpj25egvgvpjzgqy haqqvaloper1s5fc6gwrmn8urydwdvaaj7vtnxezezxv8qyfgx 1silm</b>
`;
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, msg, {
        reply_markup: inlineKeyboardTxCommands,
        parse_mode: 'html'
    });
});

bot.action('unbond', ctx => {
    let msg = `
Unbond shares from a validator.

Usage: <b>haqqd tx staking unbond [validator-addr] [amount] [flags]</b>
Example: <b>haqqd tx staking unbond haqqvaloper1n6qmmuu7gkwcfyfx6dkwlzgpj25egvgvpjzgqy 1silm</b>
`;
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, msg, {
        reply_markup: inlineKeyboardTxCommands,
        parse_mode: 'html'
    });
});

bot.command('validator', async (ctx) => {
    const validatorAddress = ctx.update.message.text.split('/validator')[1].trim();

    if (validatorAddress === '') {
        return bot.telegram.sendMessage(ctx.chat.id, 'validator address invalid', {});
    };

    await axios.get(`http://<your_ip>/cosmos/staking/v1beta1/validators/${validatorAddress}`)
        .then((res) => {
            const validator = res.data.validator;
            bot.telegram.sendMessage(ctx.chat.id, `
<b>Identity: </b> ${validator.description.identity}
<b>Moniker: </b> ${validator.description.moniker}
<b>Website: </b> ${validator.description.website}
<b>Details: </b> ${validator.description.details}
<b>Status: </b> ${validator.status}
<b>Unbonding height: </b> ${validator.unbonding_height}
<b>Unbonding time: </b> ${validator.unbonding_time}
<b>Jailed: </b> ${validator.jailed}
<b>Min Self Delegation: </b> ${validator.min_self_delegation}
        `, {
                parse_mode: 'html'
            });
        })
        .catch((e) => {
            console.log(e);
            bot.telegram.sendMessage(ctx.chat.id, 'Can\'t get info of validator', {});
        });
});

bot.launch();