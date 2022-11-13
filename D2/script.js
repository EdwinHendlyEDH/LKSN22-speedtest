const load = async() => {
    const {messages} = await fetch('./data.json').then(res => res.json());

    // top five
    const words = messages.map(m => m.text.toLowerCase().replace(/[^a-zA-Z ]/g, '')).join(' ').split(' ');
    const wordsCount = words.reduce((acc, cur) => {
        if(!acc[cur]) {
            acc[cur] = 0;
        }
        acc[cur]+=1;
        return acc;
    }, {});

    const topFive = Object.entries(wordsCount).sort((f, s) => s[1] - f[1]).slice(0, 5);
    const topFiveEl = `
        <li> Top Five sent words:
            <ul>
                ${topFive.map(word => `<li>${word[0]}, ${word[1]}x</li>`).join('')}
            </ul>
        </li>
    `;


    const messagesSent = messages.filter(m => m.from == 'Budi');
    const averageLengthSent = ~~(messagesSent.map(m => m.text.length).reduce((acc, cur) => acc + cur, 0) / messagesSent.length);
    const messagesReceive = messages.filter(m => m.from == 'Bot');
    const averageLengthReceive = ~~(messagesReceive.map(m => m.text.length).reduce((acc, cur) => acc + cur, 0) / messagesReceive.length);

    document.body.innerHTML = `
    <ul>
        ${topFiveEl}
        <li>
            Total messages sent: ${messagesSent.length}
        </li>
        <li>
            Total messages receive: ${messagesReceive.length}
        </li>
        <li>
            Average character length sent: ${averageLengthSent}
        </li>
        <li>
            Average character length receive: ${averageLengthReceive}
        </li>
    </ul>
    `;

    console.log(messages);
}

load();