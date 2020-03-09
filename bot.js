const Discord = require("discord.js"); // We Call The Packages.
// const PREFIX = "<"; // You can change this Prefix to whatever you want.
const PREFIX = process.env.PREFIX;
const Query = require("minecraft-query");


var bot = new Discord.Client();

// Events.
bot.on("ready", function() {
    bot.user.setActivity('d!help | Draconium', { type: 'STREAMING' });
    console.log(`${bot.user.username} est Prêt!`);
});

bot.on('guildMemberAdd', member => {

    member.guild.channels.get('652994649497010176').send('Hey **' + member.user.tag + '**, bienvenue sur le meilleur le plus chili serveur  ---> **D R A C O N I U M** amuse toi sur ce serveur 0 insulte 100% chili le meilleur moyen de ce faire des potes :tada::hugging: !'); 

});

bot.on('guildMemberRemove', member => {

    member.guild.channels.get('652995719703166995').send('**' + member.user.tag + '** vien juste de quitter le serveur nous espérons te revoir très prochainement :slight_frown:');

    //

});

bot.on("message", function(message) {

    if (message.author.bot) return;

    if (!message.guild) return;

    if (!message.content.startsWith(PREFIX)) return;
    
    var args = message.content.substring(PREFIX.length).split(" ");
    var command = args[0].toLowerCase();

// Commands.
    if (command == "help") {
        var embedhelpmember = new Discord.RichEmbed()
            .setAuthor("💬 Liste des Commandes.")
            .addField(" - avatar", "Affiche ton avatar.")
            .addField(" - ping", "PING PONG.")
            .addField(" - ip", "Affiche l'IP et le Port du serveur.")
            .addField(" - report", "Permettre de Signaler quelqu'un vers le staff.")
            .addField(" - suggest", "Permet d'envoyer une Suggestion au Staff")
            .setColor(0xFF0011)
            .setFooter("Ⓒ 2019-2020 Draconium.", bot.user.displayAvatarURL);
        var embedhelpadmin = new Discord.RichEmbed()
            .setAuthor("💬 Commandes de Modération.")
            .addField(" - clear", "Clear jusqu'à **99** Messages.")
            .addField(" - kick", "Expulser un membre du serveur.")
            .setColor(0xFF0011)
            .setFooter("Ⓒ 2019-2020 Draconium.", bot.user.displayAvatarURL);
            message.author.send(embedhelpmember);
            message.author.send(embedhelpadmin);
    };
   

    
    if (command == "ip") {

        var embedserverip = new Discord.RichEmbed()

            .setAuthor("Draconium")

            .addField("📡IP:", "Soon...")

            .addField("🛰️Port:", "Soon...")
        
            .addField("<:MCPE_Logo:652637305999458354>Minecraft:", "1.14")
        
            .addField("<:online:675622232155881495>Status:", "En Développement")

            .setColor(0xFF0011)

            .setFooter("Ⓒ 2019-2020 Draconium.", bot.user.displayAvatarURL);

        
            message.channel.send(embedserverip);
            message.delete();
        

    };

    if (command == "avatar") {
        let member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        message.channel.send({
               embed: {
                  title: `Photo de profil de ${member.user.username}:`,
                  image: {
                      url: member.user.displayAvatarURL
                  },
                  color: 0xFF0011
               }
        })
        message.delete();
    };

    if (command == "ping") {
        let PingEmbed = new Discord.RichEmbed()
        .setAuthor("♥️Ping")
        .addField("🏓Pong", "```" + bot.ping + "ms```")
        .setColor(0xFF0011);
        message.delete();
        message.channel.send(PingEmbed);
    };
    
    if (command == "test") {
        const DiscordServ = bot.guilds.get(message.guild.id)
        message.channel.send(DiscordServ.memberCount);
        message.channel.send(DiscordServ.owner.user.tag);
        message.channel.send(bot.ping + "ping");
    };

    if(command === "clear") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply("**🔒 Désolé, tu ne peux pas faire ça.**");
        var messagesToDelete = args[1];
        if (!args[1]) return message.channel.send("❌ Merci de donner le nombre de messages à Clear.");

        if (args[1] > 99) return message.channel.send("❌ Je ne peux pas Clear Plus de 99 Messages.");
        message.channel.fetchMessages({limit: messagesToDelete})
        .then(messages => message.channel.bulkDelete(messages.size + 1))
        .catch(error => message.channel.send(`❌ Désolé ${message.author}, Échec du Clear car: *${error}*.`));
        message.delete();
    };

    if(command == "kick") {
        message.delete()
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!kUser) return message.channel.send("❌ Merci de **@mention** la personne à Expulser!");
        let kReason = args.slice(2).join(" ");
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("**🔒 Désolé, tu ne peux pas faire ça.**");
        if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("❌ Échec du Kick, j'ai besoin d'un rôle plus haut.");
    
        let kickEmbed = new Discord.RichEmbed()
        .setDescription("**👢 Kicked**")
        .setColor(0xFF0011)
        .addField("Personne", `${kUser}`)
        .addField("Modérateur", `<@${message.author.id}>`)
        .addField("Raison", `**\`\`\`${kReason}\`\`\`**`);
    
        let adminlog = message.guild.channels.find(`name`, "【❗】logs");
        if(!adminlog) return message.channel.send("❌ Désolé, j'ai besoin de me connecter dans un channel de logs.");
        message.guild.member(kUser).kick(kReason);
        adminlog.send(kickEmbed);
    };
    if(command == "report") {
        message.delete()
        let Report = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!Report) return message.channel.send("❌ Merci de **@mention** la personne à Signaler!");
        let rReason = args.slice(2).join(" ");
        if(!rReason) return message.channel.send("❌ Merci de donner la Raison de votre Report!");
        
        
        let ReportEmbed = new Discord.RichEmbed()
        .setDescription("**Report**")
        .setColor(0xFF0011)
        .addField("Personne", `${Report}`)
        .addField("Report par", `<@${message.author.id}>`)
        .addField("Raison", `**\`\`\`${rReason}\`\`\`**`);
    
        let reportlog = message.guild.channels.find(`name`, "【🚫】report");
        if(!reportlog) return message.channel.send("❌ Désolé, j'ai besoin de me connecter dans un channel de Report.");


        reportlog.send(ReportEmbed).then(m => {
         m.react('✅');
         m.react('❌');
        })
        

    };
    
    if(command == "suggest") {

        message.delete()



        let Suggestion = args.slice(1).join(" ");

        if(!Suggestion) return message.channel.send("❌ Merci de donner votre Suggestion!");

        

        

        let SuggEmbed = new Discord.RichEmbed()

        .setDescription("**Suggestion**")

        .setColor(0xFF0011)


       


        .addField("Suggestion de: ", `<@${message.author.id}>`)
       
        
        
       

        .addField("Idée", `**\`\`\`${Suggestion}\`\`\`**`);

    

        let sugglog = message.guild.channels.find(`name`, "【🔧】suggestions");

        if(!sugglog) return message.channel.send("❌ Désolé, j'ai besoin de me connecter dans un channel de Suggestion.");

        sugglog.send(SuggEmbed).then(s => {

         s.react('✅');

         s.react('❌');

        })
        
       };

});

// Bot Login.
// bot.login('YourAwesomeBotToken');
bot.login(process.env.BOT_TOKEN);
