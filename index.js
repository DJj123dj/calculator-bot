const discord = require('discord.js')
const mathjs = require("mathjs")
const config = require("./config.json")

const intents = discord.Intents
const client = new discord.Client({intents:[intents.FLAGS.GUILDS,intents.FLAGS.DIRECT_MESSAGES,intents.FLAGS.GUILD_MESSAGES]})

client.on('ready',() => {
    console.log("Calculator Ready!")

    client.application.commands.create({
        name:"calculator",
        description:"Open the calulator"
    },config.serverId)

    client.application.commands.create({
        name:"calculate",
        description:"Run a formula",
        options:[
            {
                name:"formula",
                description:"The formula to run",
                type:"STRING",
                required:true
            }
        ]
    },config.serverId)
    
})


client.on("interactionCreate",interaction => {
    if (interaction.isCommand() == false){
        return
    }
    if (interaction.commandName == "calculator"){
        console.log("/calculator")

        var screenEmbed = new discord.MessageEmbed()
            .setColor(config.color)
            .setTitle('Calculator')
            .setDescription('=>')

        var buttonRow1 = new discord.MessageActionRow()
            .addComponents(
                new discord.MessageButton()
                    .setCustomId("NR1")
                    .setDisabled(false)
                    .setStyle("SECONDARY")
                    .setLabel("1")
            )
            .addComponents(
                new discord.MessageButton()
                    .setCustomId("NR2")
                    .setDisabled(false)
                    .setStyle("SECONDARY")
                    .setLabel("2")
            )
            .addComponents(
                new discord.MessageButton()
                    .setCustomId("NR3")
                    .setDisabled(false)
                    .setStyle("SECONDARY")
                    .setLabel("3")
            )
            .addComponents(
                new discord.MessageButton()
                    .setCustomId("MULTIPLY")
                    .setDisabled(false)
                    .setStyle("PRIMARY")
                    .setLabel("*")
            )

            var buttonRow2 = new discord.MessageActionRow()
            .addComponents(
                new discord.MessageButton()
                    .setCustomId("NR4")
                    .setDisabled(false)
                    .setStyle("SECONDARY")
                    .setLabel("4")
            )
            .addComponents(
                new discord.MessageButton()
                    .setCustomId("NR5")
                    .setDisabled(false)
                    .setStyle("SECONDARY")
                    .setLabel("5")
            )
            .addComponents(
                new discord.MessageButton()
                    .setCustomId("NR6")
                    .setDisabled(false)
                    .setStyle("SECONDARY")
                    .setLabel("6")
            )
            .addComponents(
                new discord.MessageButton()
                    .setCustomId("DIVIDE")
                    .setDisabled(false)
                    .setStyle("PRIMARY")
                    .setLabel("/")
            )

            var buttonRow3 = new discord.MessageActionRow()
            .addComponents(
                new discord.MessageButton()
                    .setCustomId("NR7")
                    .setDisabled(false)
                    .setStyle("SECONDARY")
                    .setLabel("7")
            )
            .addComponents(
                new discord.MessageButton()
                    .setCustomId("NR8")
                    .setDisabled(false)
                    .setStyle("SECONDARY")
                    .setLabel("8")
            )
            .addComponents(
                new discord.MessageButton()
                    .setCustomId("NR9")
                    .setDisabled(false)
                    .setStyle("SECONDARY")
                    .setLabel("9")
            )
            .addComponents(
                new discord.MessageButton()
                    .setCustomId("PLUS")
                    .setDisabled(false)
                    .setStyle("PRIMARY")
                    .setLabel("+")
            )

            var buttonRow4 = new discord.MessageActionRow()
            .addComponents(
                new discord.MessageButton()
                    .setCustomId("HOOKOPEN")
                    .setDisabled(false)
                    .setStyle("SECONDARY")
                    .setLabel("(")
            )
            .addComponents(
                new discord.MessageButton()
                    .setCustomId("HOOKCLOSE")
                    .setDisabled(false)
                    .setStyle("SECONDARY")
                    .setLabel(")")
            )
            .addComponents(
                new discord.MessageButton()
                    .setCustomId("NR0")
                    .setDisabled(false)
                    .setStyle("SECONDARY")
                    .setLabel("0")
            )
            .addComponents(
                new discord.MessageButton()
                    .setCustomId("MIN")
                    .setDisabled(false)
                    .setStyle("PRIMARY")
                    .setLabel("-")
            )

            var buttonRow5 = new discord.MessageActionRow()
            .addComponents(
                new discord.MessageButton()
                    .setCustomId("SQUARECARROT")
                    .setDisabled(false)
                    .setStyle("SECONDARY")
                    .setLabel("√")
            )
            .addComponents(
                new discord.MessageButton()
                    .setCustomId("EXPONENT")
                    .setDisabled(false)
                    .setStyle("SECONDARY")
                    .setLabel("^")
            )
            .addComponents(
                new discord.MessageButton()
                    .setCustomId("RESET")
                    .setDisabled(false)
                    .setStyle("DANGER")
                    .setLabel("reset")
            )
            .addComponents(
                new discord.MessageButton()
                    .setCustomId("IS")
                    .setDisabled(false)
                    .setStyle("SUCCESS")
                    .setLabel("=")
            )


        interaction.reply({embeds:[screenEmbed],components:[buttonRow1,buttonRow2,buttonRow3,buttonRow4,buttonRow5]})
    }
})


client.on("interactionCreate",interaction => {
    if (interaction.isButton() == false){
        return
    }

    
    if (interaction.message.author.id == client.user.id && interaction.message.embeds[0].title == "Calculator"){
        
        var input = ""
        input = interaction.message.embeds[0].description
        var splittedInput = input.split("=>")
        input = splittedInput.join("")
        var currentDisplay = input
        

        if (interaction.customId == "MULTIPLY"){
            var newDisplay = currentDisplay + "*"
        }
        if (interaction.customId == "DIVIDE"){
            var newDisplay = currentDisplay + "/"
        }
        if (interaction.customId == "PLUS"){
            var newDisplay = currentDisplay + "+"
        }
        if (interaction.customId == "MIN"){
            var newDisplay = currentDisplay + "-"
        }

        if (interaction.customId == "SQUARECARROT"){
            var newDisplay = currentDisplay + "sqrt("
        }
        if (interaction.customId == "EXPONENT"){
            var newDisplay = currentDisplay + "^"
        }
        if (interaction.customId == "HOOKOPEN"){
            var newDisplay = currentDisplay + "("
        }
        if (interaction.customId == "HOOKCLOSE"){
            var newDisplay = currentDisplay + ")"
        }


        if (interaction.customId == "NR0"){
            var newDisplay = currentDisplay + "0"
        }
        if (interaction.customId == "NR1"){
            var newDisplay = currentDisplay + "1"
        }
        if (interaction.customId == "NR2"){
            var newDisplay = currentDisplay + "2"
        }
        if (interaction.customId == "NR3"){
            var newDisplay = currentDisplay + "3"
        }
        if (interaction.customId == "NR4"){
            var newDisplay = currentDisplay + "4"
        }
        if (interaction.customId == "NR5"){
            var newDisplay = currentDisplay + "5"
        }
        if (interaction.customId == "NR6"){
            var newDisplay = currentDisplay + "6"
        }
        if (interaction.customId == "NR7"){
            var newDisplay = currentDisplay + "7"
        }
        if (interaction.customId == "NR8"){
            var newDisplay = currentDisplay + "8"
        }
        if (interaction.customId == "NR9"){
            var newDisplay = currentDisplay + "9"
        }
        


        if (interaction.customId == "RESET"){
            var newDisplay = ""
        }

        if (interaction.customId == "IS"){
            try{
            var output = mathjs.evaluate(currentDisplay)
            }catch{var output = "Syntax Error (Click RESET please!)"}
            
            var newDisplay = output
        }



        //setScreen
        var editedScreenEmbed = new discord.MessageEmbed()
            .setColor(config.color)
            .setTitle('Calculator')
            .setDescription('=> '+newDisplay)

        interaction.message.edit({embeds:[editedScreenEmbed]})
        interaction.deferUpdate()

    }
})


client.on("interactionCreate",interaction => {
    if (interaction.isCommand() == false){
        return
    }

    if (interaction.commandName == "calculate"){

        try{
            var formula = mathjs.evaluate(interaction.options._hoistedOptions[0].value)
            var output = ('**The output is: **`'+formula+"`")
        }catch{var output = "Syntax Error!"}
        
        interaction.reply({content:output.toString()})

    }


})

client.login(config.token)