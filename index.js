const Discord = require('discord.js')
const Bot = new Discord.Client()
const file = require('./token.json')

let questions = ['Why do you want to join our server?',
 'What will you expect from our server?',
 'What should we expect from you?',
 'How much time do you spend on your computer?',
 'How active are you on discord?',
 'Do you often play video games (and which)?',
 'Describe yourself in 5 words.',
 'Do you know anything about programming and what?',
 'Do you get easily mad?',
 'Do you have hobbies? If you do tell me about them.',
 'If you lose an argument, do you swear the other side?',
 'Can you BE friendly with weeb people?'
 'Do you like these questions so far?',
 'Can you accept that you are not right in an argument?',
 'Tell me a joke! And this test will be done.']
let waiting = false
let num
let bool1 = true, bool2 = true
let decide
let questionslen = 1
let string = '########################################\n'
Bot.on('ready', () => {
    console.log('Rectuitment Bot is ready')
})
let channel
Bot.on('guildMemberAdd', member => {
    member.send('Welcome!Please read the channels info and welcome then tag Recruiter so he can explain to you what will happen :)')
    let role = member.guild.roles.find(role => role.name === 'Awaiting')
    member.addRole(role)
})
Bot.on('message', message => {
    if (message.author.bot) return
    let strmsg = '' + message
    if (message.channel.id == 605737081658146826) {
        if (!channel) channel = message.channel
        console.log('if')
        console.log(string)
        if (num !== undefined) {
            console.log('О-А-О-Е-О')
            ++num
            string += num + '. ' + message + '\n'
        }
        let user = message.author
        switch(strmsg) {
            case 'r!start':
                message.channel.send('Your recruitment is about to start! You will answer a couple of questions. From your answers the admins will see if you will be accepted. Every message you type will be counted аs an answer. When you are ready, type: r!begin')
                break
            case 'r!begin':
                num = 0
                string += 'user: ' + message.member.user.username + '\n'
                break
        }
        console.log(num, num < questionslen)
        if (num !== undefined && num < questionslen) {
            message.channel.send(questions[num])
        }
        if (num === questionslen) {
            message.channel.send('Done! Wait until the admins check your answers and decide your faith!')
            string += '########################################\n'
            Bot.users.get("413041751528308736").send(string);
            Bot.users.get("272701530258276352").send(string);
            num = undefined
            bool1 = true
            bool2 = true
            waiting = true
            decide = 0
        }
    } else {
        if (waiting) {
            if (message.channel.id == 605741060039114772 && bool1) {
                if (strmsg == 'r!approve') {
                    bool1 = false
                    ++decide
                }
                if (strmsg == 'r!refuse') {
                    bool1 = false
                    --decide
                }
            }
            if (message.channel.id == 605746390999629826 && bool2) {
                if (strmsg == 'r!approve') {
                    bool2 = false
                    ++decide
                }
                if (strmsg == 'r!refuse') {
                    bool2 = false
                    --decide
                }
            }
            if (!bool1 && !bool2) {
                if (decide == 2) channel.send('You are accepted! You may now join : https://discord.gg/pE5NrNF')
                else channel.send('You are not accepted :( . Please leave the recruitment server or you will be kicked.')
                waiting = false
            }
        }
    }
})


Bot.login(file.token)
