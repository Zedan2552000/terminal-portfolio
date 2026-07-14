const terminalBody = document.getElementById('terminal-body');
const outputContainer = document.getElementById('output');
const commandInput = document.getElementById('command-input');

const ASCII_ART = `
  ______        __             
 |___  /       | |             
    / / ___  __| | __ _ _ __   
   / / / _ \\/ _\` |/ _\` | '_ \\  
  / /_|  __/ (_| | (_| | | | | 
 /_____\\___|\\__,_|\\__,_|_| |_| 
                               
Welcome to my interactive terminal portfolio.
Type 'help' to see a list of available commands.
`;

const ABOUT = `
Hi, I'm Zedan! 👋
I am a passionate software developer who loves building things for the web.
I specialize in creating beautiful, interactive, and responsive user interfaces.
I'm always eager to learn new technologies and take on challenging projects.
`;

const SKILLS = `
💻 <span class="highlight">Frontend:</span> HTML5, CSS3, JavaScript, React, Tailwind CSS
⚙️ <span class="highlight">Backend:</span> Node.js, Python, Home Assistant Automations
🛠️ <span class="highlight">Tools:</span> Git, GitHub, VS Code, Docker, Linux
`;

const PROJECTS = `
1. <a href="https://github.com/Zedan2552000" target="_blank">Terminal Portfolio</a>
   A retro-style interactive portfolio built with HTML/CSS/JS.

2. <a href="https://github.com/Zedan2552000" target="_blank">Home Assistant Setup</a>
   My automated smart home configuration using YAML and Python.

3. <a href="https://github.com/Zedan2552000" target="_blank">Student Discount Radar</a>
   A browser extension that helps students find discounts online.

Type 'github' to view my actual GitHub profile.
`;

const CONTACT = `
📧 Email: zedan@example.edu.eg
🐙 GitHub: <a href="https://github.com/Zedan2552000" target="_blank">github.com/Zedan2552000</a>
💼 LinkedIn: <a href="#" target="_blank">linkedin.com/in/zedan</a>
`;

const HELP = `
Available commands:
  <span class="highlight">about</span>      - Learn more about me
  <span class="highlight">skills</span>     - View my technical skills
  <span class="highlight">projects</span>   - See what I've been working on
  <span class="highlight">contact</span>    - Get my contact information
  <span class="highlight">github</span>     - Opens my GitHub profile in a new tab
  <span class="highlight">theme</span>      - Toggle light/dark mode
  <span class="highlight">clear</span>      - Clear the terminal screen
  <span class="highlight">help</span>       - Show this help message
`;

const commands = {
    'about': ABOUT,
    'skills': SKILLS,
    'projects': PROJECTS,
    'contact': CONTACT,
    'help': HELP
};

function printInitialMessage() {
    printHTML(\`<div class="ascii-art">\${ASCII_ART}</div>\`);
}

function processCommand(cmd) {
    const cleanCmd = cmd.trim().toLowerCase();
    
    // Echo the command
    const cmdBlock = document.createElement('div');
    cmdBlock.className = 'cmd-block';
    cmdBlock.innerHTML = \`<span class="prompt">zedan@portfolio:~$ </span><span class="cmd-text">\${cleanCmd}</span>\`;
    outputContainer.appendChild(cmdBlock);

    if (cleanCmd === '') {
        scrollToBottom();
        return;
    }

    if (cleanCmd === 'clear') {
        outputContainer.innerHTML = '';
        printInitialMessage();
        return;
    }

    if (cleanCmd === 'github') {
        printHTML("Opening GitHub profile in a new tab...");
        setTimeout(() => {
            window.open('https://github.com/Zedan2552000', '_blank');
        }, 1000);
        return;
    }
    
    if (cleanCmd === 'theme') {
        document.body.style.backgroundColor = document.body.style.backgroundColor === 'white' ? 'var(--bg-color)' : 'white';
        printHTML("Theme toggled.");
        return;
    }

    if (commands[cleanCmd]) {
        printHTML(commands[cleanCmd]);
    } else {
        printHTML(\`<span class="error">Command not found: \${cleanCmd}. Type 'help' to see available commands.</span>\`);
    }
}

function printHTML(html) {
    const responseBlock = document.createElement('div');
    responseBlock.className = 'cmd-response';
    responseBlock.innerHTML = html;
    outputContainer.appendChild(responseBlock);
    
    // Add an empty line for spacing
    const spacer = document.createElement('div');
    spacer.style.height = '15px';
    outputContainer.appendChild(spacer);
    
    scrollToBottom();
}

function scrollToBottom() {
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

// Keep focus on input
document.addEventListener('click', () => {
    commandInput.focus();
});

commandInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const cmd = this.value;
        this.value = '';
        processCommand(cmd);
    }
});

// Init
window.onload = () => {
    printInitialMessage();
    commandInput.focus();
};
