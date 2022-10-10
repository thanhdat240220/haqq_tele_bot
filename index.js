const { Telegraf } = require('telegraf');
const axios = require('axios').default;
const cron = require('node-cron');

const bot = new Telegraf('5500276764:AAF_7fPK07eck_dpIu2R9n5YeqSrG9L7psE');

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
- The bot is used to monitor your validator node.
- Then report event and status of your node.
- Tip command for haqq node.
- For more detail, please input /help
    `, {
        parse_mode: 'html'
    });
});

bot.help((ctx) => ctx.reply(`
 - <b>/tip</b> to get tips for haqq node.
 - <b>/monitor</b> to get guide monitoring a validator node.  
`, { parse_mode: 'html' }));

bot.command('monitor', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, `
    - Firsly, you need add a validator address with command <b> /monitor_validator YOUR_VALIDATOR_ADDRESS </b>
    - Run monitor: <b>/start_monitor</b>
    - Stop monitor: <b>/stop_monitor</b>
    `, {
        parse_mode: 'html'
    });
});

bot.command('tip', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, `
 - You can use <b>/wallet</b> to get tips about using the command with wallet in haqq.
 - You can use <b>/tx</b> to get an example about using the command with transactions in haqq.
 - You can use <b>/validator YOUR_VALIDATOR_ADDRESS</b> to check validator status.
 - You can use: <b>/balance YOUR_WALLET_ADDRESS</b> to check balance.
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

bot.command("balance", async (balance) => {
    let wallet = balance.update.message.text.split('/balance ');
    if (!wallet[1] || !wallet[1].trim()) {
        bot.telegram.sendMessage(balance.chat.id, 'Please enter you address', {});
        return;
    }

    let wallet_str = balance.update.message.text.split('/balance ')[1].trim();
    await axios.get(`https://jeffjack.tk/bank/balances/${wallet_str}`)
        .then((res) => {
            let balances = res.data.result;
            let balances_list = "Your balances: ";
            for (let i = 0; i < balances.length; i++) {
                balances_list = `${balances_list} - ${balances[i].amount} ${balances[i].denom} `
            }
            bot.telegram.sendMessage(balance.chat.id, `${balances_list}`, { parse_mode: 'html' });
        }).catch((e) => {
            console.log(e);
            bot.telegram.sendMessage(balance.chat.id, 'Can\'t get info of your wallet', {});
        });
});

bot.command('validator', async (ctx) => {
    const validatorAddress = ctx.update.message.text.split('/validator')[1].trim();

    if (validatorAddress === '') {
        return bot.telegram.sendMessage(ctx.chat.id, 'validator address invalid', {});
    };

    await axios.get(`https://jeffjack.tk/cosmos/staking/v1beta1/validators/${validatorAddress}`)
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
            console.log(e.code);
            bot.telegram.sendMessage(ctx.chat.id, 'Can\'t get info of validator', {});
        });
});

let validator_address = "";
let validator = "";
let validator_status = "Inactive"
let delegations = "";
let delegations_length = "";
let total_delegate = 0;
let task = null;

bot.command("monitor_validator", async (response) => {
    validator_address = response.update.message.text.split('/monitor_validator ')[1].trim();
    total_delegate = 0;
    validator_status = "Inactive";
    await axios.get(`https://jeffjack.tk/cosmos/staking/v1beta1/validators/${validator_address}`)
        .then((res) => {
            validator = res.data.validator;
            if (validator.status == "BOND_STATUS_BONDED") { 
                validator_status = "Active" 
            }
        }).catch((e) => {
            console.log(e);
            bot.telegram.sendMessage(response.chat.id, 'Can\'t get info of validator', {});
        });

    await axios.get(`https://jeffjack.tk/cosmos/staking/v1beta1/validators/${validator_address}/delegations`)
        .then((res) => {
            delegations = res.data.delegation_responses; // collect delegation of validator
            delegations_length = delegations.length;
        }).catch((e) => {
            console.log(e);
            bot.telegram.sendMessage(response.chat.id, 'Can\'t get info of delegators ', {});
        });

    for (let i = 0; i < delegations_length; i++) {
        total_delegate = total_delegate + (`${delegations[i].balance.amount}` / 1e18);
    }

    bot.telegram.sendMessage(response.chat.id, `
<b>Nodename: </b> <span class="tg-spoiler"> ${validator.description.moniker} </span>
<b>Website: </b> <i> ${validator.description.website} </i>
<b>Details: </b> <i> ${validator.description.details} </i>
<b>Status: </b> <i> ${validator_status} </i>
<b>Unbonding at block height: </b> <i> ${validator.unbonding_height} </i>
<b>Unbonding at time: </b> <i> ${validator.unbonding_time} </i>
<b>Jailed Status: </b> <i> ${validator.jailed} </i> 
<b>Delegator No.: </b> <i> ${delegations_length} </i>
<b>Total delegate: </b> <i> ${total_delegate} ISLM </i>
`
        , { parse_mode: 'html' });

});

bot.command("start_monitor", async (ctx) => {
    if (!validator_address) {
        bot.telegram.sendMessage(ctx.chat.id, `Please using <b>/monitor_validator validator_address</b> to setting`, {
            parse_mode: 'html'
        });
        return;
    }

    if (!task) {
        task = cron.schedule('* * * * *', async (cronnode) => {
            await axios.get(`https://jeffjack.tk/cosmos/staking/v1beta1/validators/${validator_address}`)
                .then((res) => {
                    let newValidator = res.data.validator;
                    let newValidatorStatus = "Inactive";

                    if (newValidator.status == "BOND_STATUS_BONDED") {
                        newValidatorStatus = "Active"
                    }
                    {
                        bot.telegram.sendMessage(ctx.chat.id, `
<b>Nodename: </b> <span class="tg-spoiler"> ${newValidator.description.moniker} </span>
<b>Website: </b> <i> ${newValidator.description.website} </i>
<b>Details: </b> <i> ${newValidator.description.details} </i>
<b>Status: </b> <i> ${validator_status} </i>
<b>Unbonding at block height: </b> <i> ${newValidator.unbonding_height} </i>
<b>Unbonding at time: </b> <i> ${newValidator.unbonding_time} </i>
<b>Jailed Status: </b> <i> ${newValidator.jailed} </i> 
<b>Delegator No.: </b> <i> ${delegations_length} </i>
<b>Total delegate: </b> <i> ${total_delegate} ISLM </i>
                        `
                        , { parse_mode: 'html' });
                    }

                    if (`${validator_status}` != `${newValidatorStatus}`) {
                        bot.telegram.sendMessage(ctx.chat.id, `
               		     - Your validator <b>${validator_address}</b> is changed from <b>${validator_status}</b> to <b>${newValidatorStatus}</b>`
                            , { parse_mode: 'html' });
                        validator_status = newValidatorStatus;
                    }

                    if (`${validator.jailed}` != "false") {
                        bot.telegram.sendMessage(ctx.chat.id, `
                             - Your validator <b>${validator_address}</b> got jailed.`
                            , { parse_mode: 'html' });
                    }

                })
                .catch((e) => {
                    console.log(e);
                    bot.telegram.sendMessage(ctx.chat.id, 'Can\'t get info of validator', {});
                });
        });
        task.start();
    }
});

bot.command("stop_monitor", async (ctx) => {
    const msg = ctx.update.message.text;
    ctx.reply("Stopped monitor " + validator_address);
    if (task) task.stop();
    task = null;
});

bot.launch();