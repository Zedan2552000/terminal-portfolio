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
  <span class="highlight">about</span>        - Learn more about me
  <span class="highlight">skills</span>       - View my technical skills
  <span class="highlight">projects</span>     - See what I've been working on
  <span class="highlight">contact</span>      - Get my contact information
  <span class="highlight">github</span>       - Opens my GitHub profile in a new tab
  <span class="highlight">github-stats</span> - Fetch my live GitHub statistics
  <span class="highlight">theme</span>        - Toggle light/dark mode
  <span class="highlight">clear</span>        - Clear the terminal screen
  <span class="highlight">matrix</span>       - Enter the matrix
  <span class="highlight">help</span>         - Show this help message
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

async function fetchGitHubStats() {
    printHTML("Fetching data from GitHub API...");
    try {
        const response = await fetch('https://api.github.com/users/Zedan2552000');
        if (!response.ok) throw new Error("API Limit Reached or Error");
        const data = await response.json();
        const stats = \`
<span class="highlight">GitHub Stats for \${data.login}:</span>
- Name: \${data.name || 'N/A'}
- Public Repos: \${data.public_repos}
- Followers: \${data.followers}
- Following: \${data.following}
- Profile: <a href="\${data.html_url}" target="_blank">\${data.html_url}</a>
\`;
        printHTML(stats);
    } catch (e) {
        printHTML("<span class='error'>Failed to fetch GitHub stats.</span>");
    }
}

let matrixInterval;
function startMatrix() {
    if (document.getElementById('matrix-canvas')) {
        printHTML("You are already in the Matrix.");
        return;
    }
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-canvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '0';
    canvas.style.opacity = '0.3';
    canvas.style.pointerEvents = 'none';
    terminalBody.style.position = 'relative';
    terminalBody.insertBefore(canvas, terminalBody.firstChild);

    const ctx = canvas.getContext('2d');
    canvas.width = terminalBody.clientWidth;
    canvas.height = terminalBody.clientHeight;

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%""\'#&_(),.;:?!\\|{}<>[]^~';
    const matrix = letters.split('');
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = [];
    for(let x = 0; x < columns; x++) drops[x] = 1;

    function draw() {
        ctx.fillStyle = 'rgba(26, 26, 26, 0.1)'; // Matches --terminal-bg loosely
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0f0';
        ctx.font = fontSize + 'px monospace';
        for(let i = 0; i < drops.length; i++) {
            const text = matrix[Math.floor(Math.random() * matrix.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }
    matrixInterval = setInterval(draw, 50);
    printHTML("Matrix initialized. Type 'clear' to exit.");
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
        if (matrixInterval) {
            clearInterval(matrixInterval);
            matrixInterval = null;
            const c = document.getElementById('matrix-canvas');
            if(c) c.remove();
        }
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
    
    if (cleanCmd === 'github-stats') {
        fetchGitHubStats();
        return;
    }
    
    if (cleanCmd === 'matrix') {
        startMatrix();
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
    responseBlock.style.position = 'relative';
    responseBlock.style.zIndex = '1';
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
