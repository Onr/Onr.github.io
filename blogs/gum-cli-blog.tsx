import React, { useEffect, useRef, useState } from 'react'

export default function GumCliLLMBlog() {
  const [copiedId, setCopiedId] = useState(null)
  const timeoutRef = useRef(null)

  const handleCopy = (id, text) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text)
      setCopiedId(id)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setCopiedId(null), 2000)
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <main>
          {/* Header */}
          <header className="mb-12">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-zinc-800 px-3 py-1 text-sm">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
              Developer Workflow
            </div>
            <h1 className="text-5xl font-bold tracking-tight">
              Taming LLM Codebases with <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Gum</span>
            </h1>
            <p className="mt-4 text-xl text-zinc-400">
              Stop drowning in AI-generated scripts. Build a single CLI that remembers everything.
            </p>
            <div className="mt-3 text-sm text-zinc-500">Updated: Oct 2025 · 6 min read</div>
            <div className="mt-4">
              <a 
                href="https://github.com/charmbracelet/gum" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <span>🎀</span>
                <span>charmbracelet/gum: A tool for glamorous shell scripts</span>
                <span>→</span>
              </a>
            </div>
          </header>

          {/* Teaser Terminal */}
          <section className="mb-12 rounded-2xl border border-emerald-800 bg-zinc-950 p-6 shadow-lg">
            <TerminalTeaser />
          </section>

          {/* The Problem */}
          <SectionCard title="The Problem: AI-Generated Chaos">
            <p className="text-zinc-300 mb-4">
              You're building a web app with an LLM. First week: basic CRUD operations and database schema. 
              Second week: authentication, file uploads, and email notifications. Third week: API versioning, rate limiting, and caching. 
              A month in, you have scripts for development, testing, deployment, database operations, monitoring setup, and more. 
              Each feature added a few more files. Now you have 25+ scripts scattered across your repo, and honestly, 
              you're not sure which ones are still relevant.
            </p>
            <div className="my-6 rounded-lg border border-red-900 bg-red-950 p-4">
              <h4 className="font-semibold text-red-400 mb-2">Common Developer Frustrations:</h4>
              <ul className="list-disc space-y-2 pl-5 text-sm text-zinc-300">
                <li><strong>Script sprawl:</strong> Dozens of <code className="text-red-300">run-*.sh</code> files with no clear organization</li>
                <li><strong>Memory loss:</strong> "What parameters does deploy.sh need again?"</li>
                <li><strong>Onboarding hell:</strong> New developers (or future you) can't figure out how to start</li>
                <li><strong>LLM amnesia:</strong> The AI forgets to integrate new features into existing workflows</li>
              </ul>
            </div>
            <p className="text-zinc-300">
              Three months later, you return to the project. You stare at your <code className="text-emerald-400">scripts/</code> folder 
              like an archaeologist examining ancient ruins. <em>"What does run-worker-prod-v2-final.sh do?"</em>
            </p>
          </SectionCard>

          {/* Why Gum */}
          <SectionCard title="Why Gum for LLM-Generated Projects?">
            <p className="text-zinc-300 mb-4">
              <strong>Gum</strong> is a command-line tool that lets you build beautiful, interactive CLIs in bash. 
              For LLM-generated projects, a well-structured Gum CLI becomes your <strong>single source of truth</strong> — 
              a self-documenting front door to your entire codebase.
            </p>
            
            <div className="my-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-emerald-800 bg-emerald-950 p-4">
                <h4 className="font-semibold text-emerald-400 mb-2">✅ With Gum CLI</h4>
                <ul className="space-y-2 text-sm text-zinc-300">
                  <li>Run <code className="text-emerald-300">./main-cli.sh</code></li>
                  <li>See every available action with descriptions</li>
                  <li>Choose what you need interactively</li>
                  <li>Preview commands before they run</li>
                  <li>Safe confirmations for dangerous ops</li>
                </ul>
              </div>
              <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-4">
                <h4 className="font-semibold text-zinc-400 mb-2">❌ Without It</h4>
                <ul className="space-y-2 text-sm text-zinc-400">
                  <li>Grep through scripts/ folder</li>
                  <li>Read source code to understand options</li>
                  <li>Copy-paste commands from docs</li>
                  <li>Hope you didn't miss a required flag</li>
                </ul>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-zinc-200 mt-6 mb-3">Key Benefits for Developers:</h3>
            <ul className="list-disc space-y-2 pl-5 text-zinc-300">
              <li><strong>One entry point:</strong> Everything starts from <code className="text-emerald-400">./main-cli.sh</code> in your repo root</li>
              <li><strong>Self-documenting:</strong> Each option explains itself — no need to maintain separate docs</li>
              <li><strong>Progressive disclosure:</strong> Start with core commands, reveal advanced options only when needed</li>
              <li><strong>Safe by default:</strong> Preview and confirm before any destructive action</li>
              <li><strong>Future-proof:</strong> Forces you (and your LLM) to integrate new features instead of creating orphan scripts</li>
              <li><strong>AI-friendly:</strong> Modern LLMs excel at creating beautiful, functional Gum CLIs with minimal guidance — they understand the patterns and can generate polished interfaces quickly</li>
            </ul>
          </SectionCard>

          {/* Essential Tips */}
          <SectionCard title="🎯 Essential Tips for Success" accent>
            <div className="space-y-4">
              <TipCard 
                number="1" 
                title="Use ONE Single ./main-cli.sh File"
                description="Everything starts from ./main-cli.sh in your repo root. No exceptions. No 'quick scripts' outside the CLI. If you need it more than once, it belongs in the menu. This is your contract with yourself (and your LLM)."
              />
              <TipCard 
                number="2" 
                title="Start Small, Add Incrementally"
                description="Begin with one core command. As features grow, create separate scripts in a scripts/ folder that your main CLI calls - keep the main-cli.sh clean and focused on orchestration. Get it working perfectly before adding more."
              />
              <TipCard 
                number="3" 
                title="Test After Every Addition"
                description="After each new menu item, run through the entire flow. Does the order make sense? Are the descriptions clear? Can you use it without looking at the code? If not, refine before moving on."
              />
              <TipCard 
                number="4" 
                title="Always Provide Defaults & Explanations"
                description="Never leave yourself guessing. Use gum input with default values, gum choose for selections, and always explain what each option does. Include examples for complex inputs."
              />
              <TipCard 
                number="5" 
                title="Preview + Confirm for Everything Important"
                description="Show the exact command that will run. Use gum confirm before execution. This builds trust and helps you learn what's happening under the hood. Your future self will thank you."
              />
            </div>
            <div className="mt-6 rounded-lg border border-amber-800 bg-amber-950 p-4">
              <p className="text-sm text-zinc-300">
                <strong className="text-amber-400">⚠️ Critical Reminder:</strong> LLMs don't always listen to instructions. 
                After <em>every request</em>, check if the main entry point was updated. If not, explicitly ask: <em>"Now update main-cli.sh with a menu option for this feature, 
                including description, command preview, and confirmation prompt."</em>
              </p>
            </div>
          </SectionCard>

          {/* LLM Instructions */}
          <SectionCard title="LLM Instructions to Copy-Paste">
            <p className="mb-4 text-zinc-300">
              Save this as <code className="text-emerald-400">LLM_INSTRUCTIONS.md</code> in your project root. 
              Reference it in every prompt session with your AI assistant.
            </p>
            <CodeBlock 
              filename="LLM_INSTRUCTIONS.md" 
              code={`## Gum CLI Development Rules

### CORE PRINCIPLE: SINGLE ENTRYPOINT
- ONE main script at repo root: ./main-cli.sh using gum
- ALL features integrate into this menu - NO orphan scripts
- Menu provides orientation with clear descriptions for each action
- Optional symlink: ./dev -> ./main-cli.sh for convenience

### IMPLEMENTATION STRATEGY
1. Start with 2-3 essential commands
2. Test thoroughly before adding more
3. Ensure menu order makes logical sense
4. Group related actions together

### FOR EVERY MENU ITEM
- Show: action name + one-line description
- Include default values where applicable  
- Add examples for complex inputs
- Use gum style for visual hierarchy

### PARAMETER CONTROL
- Use \`gum input\` for text with default values
- Use \`gum choose\` for option selection
- Use \`gum confirm\` for yes/no decisions
- Validate inputs and provide clear error messages

### PREVIEW + CONFIRM (MANDATORY)
- ALWAYS show the exact command before execution
- Use \`gum confirm\` for ANY impactful operation
- Display command with syntax highlighting
- Allow abort at confirmation

### CRITICAL REMINDER FOR EVERY TASK
After completing ANY development task, you MUST:
1. Add/update corresponding action in ./main-cli.sh
2. Include descriptive label + help text
3. Add command preview + confirmation
4. Test the new menu option end-to-end
5. Ensure new scripts are in scripts/ and referenced properly

### EXAMPLE MENU ITEM PATTERN
\`\`\`bash
"📦 Build Docker image :: Creates optimized production image"
# When selected:
# 1. Show what will happen
# 2. Display exact command  
# 3. Confirm before execution
# 4. Provide feedback on completion
\`\`\`

### ERROR HANDLING
- Check prerequisites before running
- Provide helpful error messages
- Suggest fixes for common issues
- Never fail silently`}
              onCopy={handleCopy}
              copiedId={copiedId}
            />
          </SectionCard>
          <SectionCard title="Example: Interactive Workflow" accent>
            <p className="text-zinc-300 mb-4">Here's what your CLI looks like in action:</p>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-zinc-400 mb-2">Step 1: Main Menu</h4>
                <TerminalExample 
                  lines={[
                    { text: 'My Project Developer CLI', style: 'font-bold text-emerald-400' },
                    { text: 'Profile: dev | Port: 8000', style: 'text-zinc-500 text-xs' },
                    { text: '', style: '' },
                    { text: 'Use ↑/↓ to navigate, Enter to select', style: 'text-zinc-500 text-xs' },
                    { text: '', style: '' },
                    { text: '  🚀 Start Services       :: Launch Docker containers', style: 'text-zinc-300' },
                    { text: '> 🗄️  Database Operations  :: Migrations, seeding, backups', style: 'text-emerald-300' },
                    { text: '  🛠️  Development Tools    :: Tests, linting, formatting', style: 'text-zinc-300' },
                    { text: '  ⚡ Quick Actions        :: Common tasks', style: 'text-zinc-300' },
                    { text: '  ❌ Exit', style: 'text-zinc-300' },
                  ]}
                />
              </div>

              <div>
                <h4 className="text-sm font-semibold text-zinc-400 mb-2">Step 2: Submenu Opens</h4>
                <TerminalExample 
                  lines={[
                    { text: '🗄️ Database Operations', style: 'font-bold text-emerald-400' },
                    { text: '', style: '' },
                    { text: 'Use ↑/↓ to navigate, Enter to select', style: 'text-zinc-500 text-xs' },
                    { text: '', style: '' },
                    { text: '> 📤 Run migrations       :: Apply pending database migrations', style: 'text-emerald-300' },
                    { text: '  ⏪ Rollback migration   :: Undo last migration', style: 'text-zinc-300' },
                    { text: '  🌱 Seed data            :: Load demo data into database', style: 'text-zinc-300' },
                    { text: '  💾 Create backup        :: Backup database to file', style: 'text-zinc-300' },
                    { text: '  🔄 Restore backup       :: Restore from backup file', style: 'text-zinc-300' },
                    { text: '  🐚 Open DB shell        :: Interactive PostgreSQL shell', style: 'text-zinc-300' },
                    { text: '  ← Back to main menu', style: 'text-zinc-500' },
                  ]}
                />
              </div>

              <div>
                <h4 className="text-sm font-semibold text-zinc-400 mb-2">Step 3: Command Preview & Confirm</h4>
                <TerminalExample 
                  lines={[
                    { text: '📋 Command Preview:', style: 'text-zinc-400 text-xs' },
                    { text: '┌─────────────────────────────────────────────┐', style: 'text-zinc-700' },
                    { text: '│ docker compose exec api alembic upgrade head │', style: 'text-emerald-400' },
                    { text: '└─────────────────────────────────────────────┘', style: 'text-zinc-700' },
                    { text: '', style: '' },
                    { text: 'This will apply all pending migrations to the database.', style: 'text-zinc-400 text-sm' },
                    { text: '', style: '' },
                    { text: '> Yes, run this command', style: 'text-emerald-300' },
                    { text: '  No, cancel', style: 'text-zinc-500' },
                  ]}
                />
              </div>

              <div>
                <h4 className="text-sm font-semibold text-zinc-400 mb-2">Step 4: Execution & Feedback</h4>
                <TerminalExample 
                  lines={[
                    { text: 'Running migrations...', style: 'text-zinc-400' },
                    { text: '', style: '' },
                    { text: 'INFO  [alembic.runtime.migration] Running upgrade abc123 -> def456', style: 'text-zinc-500 text-xs' },
                    { text: 'INFO  [alembic.runtime.migration] Running upgrade def456 -> ghi789', style: 'text-zinc-500 text-xs' },
                    { text: '', style: '' },
                    { text: '┌──────────────────────────────────────────┐', style: 'text-emerald-800' },
                    { text: '│ ✅ Migrations applied successfully!      │', style: 'text-emerald-400' },
                    { text: '│    2 migrations run                      │', style: 'text-emerald-400' },
                    { text: '└──────────────────────────────────────────┘', style: 'text-emerald-800' },
                    { text: '', style: '' },
                    { text: 'Press Enter to return to menu...', style: 'text-zinc-500 text-xs' },
                  ]}
                />
              </div>
            </div>
          </SectionCard>

          {/* Getting Started */}
          <SectionCard title="Getting Started">
            <div className="space-y-4 text-zinc-300">
              <div>
                <h3 className="text-lg font-semibold text-zinc-200 mb-2">1. Install Gum</h3>
                <CodeBlock 
                  filename="terminal" 
                  code={`# macOS
brew install gum

# Linux
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://repo.charm.sh/apt/gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/charm.gpg
echo "deb [signed-by=/etc/apt/keyrings/charm.gpg] https://repo.charm.sh/apt/ * *" | sudo tee /etc/apt/sources.list.d/charm.list
sudo apt update && sudo apt install gum`}
                  onCopy={handleCopy}
                  copiedId={copiedId}
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-zinc-200 mb-2">2. Create Agent Instructions File</h3>
                <p className="text-sm text-zinc-300 mb-2">
                  Save this as <code className="text-emerald-400">AGENTS.md</code> in your project root:
                </p>
                <CodeBlock 
                  filename="AGENTS.md" 
                  code={`## Gum CLI Development Rules

### CORE PRINCIPLE: SINGLE ENTRYPOINT
- ONE main script at repo root: ./main-cli.sh using gum
- ALL features integrate into this menu - NO orphan scripts
- Menu provides orientation with clear descriptions for each action

### IMPLEMENTATION STRATEGY
1. Start with one essential command
2. As features grow, create separate scripts in scripts/ folder
3. Main CLI should call these scripts - keep main-cli.sh clean
4. Test thoroughly before adding more
5. Ensure menu order makes logical sense
6. Group related actions together

### FOR EVERY MENU ITEM
- Show: action name + one-line description
- Include default values where applicable  
- Use gum style for visual hierarchy

### PARAMETER CONTROL
- Use \`gum input\` for text with default values
- Use \`gum choose\` for option selection
- Use \`gum confirm\` for yes/no decisions

### PREVIEW + CONFIRM (MANDATORY)
- ALWAYS show the exact command before execution
- Use \`gum confirm\` for ANY impactful operation
- Allow abort at confirmation

### CRITICAL REMINDER FOR EVERY TASK
After completing ANY development task, you MUST:
1. Add/update corresponding action in ./main-cli.sh
2. Include descriptive label + help text
3. Add command preview + confirmation
4. Test the new menu option end-to-end`}
                  onCopy={handleCopy}
                  copiedId={copiedId}
                />
                
                <div className="mt-4 rounded-lg border border-zinc-700 bg-zinc-900 p-4">
                  <p className="text-sm text-zinc-300 mb-3">
                    <strong>Optional:</strong> Add agent-specific instruction files for better integration:
                  </p>
                  <ul className="space-y-2 text-sm text-zinc-400">
                    <li>
                      <code className="text-emerald-400">.cursorrules</code> - For Cursor IDE
                    </li>
                    <li>
                      <code className="text-emerald-400">.clinerules</code> - For Cline (VS Code extension)
                    </li>
                    <li>
                      <code className="text-emerald-400">.github/copilot-instructions.md</code> - For GitHub Copilot
                    </li>
                    <li>
                      <code className="text-emerald-400">.windsurf/rules.md</code> - For Windsurf IDE
                    </li>
                  </ul>
                  <p className="text-xs text-zinc-500 mt-3">
                    Each file can contain similar rules tailored to that agent's workflow. Reference your AGENTS.md in these files.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-zinc-200 mb-2">3. Let Your LLM Create the CLI</h3>
                <p className="text-sm text-zinc-300 mb-2">Ask your AI assistant to create the initial CLI structure:</p>
                <CodeBlock 
                  filename="prompt" 
                  code={`Create a main-cli.sh file in the repo root using Gum.

Requirements:
- Single entry point for all project operations
- Start with 1-2 basic commands (like start/stop services)
- Each menu item should have a description
- Preview commands before execution
- Use gum confirm for confirmations
- Include proper error handling

Make it simple and we'll expand it incrementally.`}
                  onCopy={handleCopy}
                  copiedId={copiedId}
                />
                
                <div className="mt-4 rounded-lg border border-amber-800 bg-amber-950 p-4">
                  <p className="text-sm text-zinc-300">
                    <strong className="text-amber-400">⚠️ Important:</strong> When running the CLI, always use{' '}
                    <code className="text-amber-300">bash main-cli.sh</code> instead of{' '}
                    <code className="text-zinc-500 line-through">sh main-cli.sh</code>.{' '}
                    The <code className="text-amber-300">bash</code> command ensures proper shell feature support that Gum relies on.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-zinc-200 mb-2">4. Start Using It</h3>
                <CodeBlock 
                  filename="terminal" 
                  code={`chmod +x main-cli.sh

# Run with bash (not sh!)
bash main-cli.sh

# Or if executable:
./main-cli.sh`}
                  onCopy={handleCopy}
                  copiedId={copiedId}
                />
                <p className="text-sm text-zinc-300 mt-3">
                  From now on, every time you ask your AI to create a new feature, remind it to check the AGENTS.md file 
                  and update the main-cli.sh menu accordingly.
                </p>
              </div>
            </div>
          </SectionCard>

          {/* Footer */}
          <footer className="mt-12 border-t border-zinc-800 pt-6 text-center text-sm text-zinc-500">
            <p>Built for solo developers using LLMs to build projects</p>
            <p className="mt-2">
              <a href="https://github.com/charmbracelet/gum" className="text-emerald-400 hover:text-emerald-300">
                Get Gum →
              </a>
            </p>
          </footer>
        </main>
      </div>
      <LiveRegion copiedId={copiedId} />
    </div>
  )
}

/* Components */
function SectionCard({ title, children, accent }) {
  return (
    <section className={`mb-10 rounded-2xl border ${accent ? "border-emerald-800" : "border-zinc-800"} bg-zinc-900 p-6 shadow-lg`}>
      <h2 className={`text-3xl font-semibold ${accent ? "text-emerald-400" : "text-zinc-100"} mb-4`}>
        {title}
      </h2>
      <div>{children}</div>
    </section>
  )
}

function TipCard({ number, title, description }) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
      <div className="flex items-start gap-3">
        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-950 text-sm font-bold text-emerald-400">
          {number}
        </span>
        <div className="flex-1">
          <h3 className="font-semibold text-zinc-200 mb-1">{title}</h3>
          <p className="text-sm text-zinc-400">{description}</p>
        </div>
      </div>
    </div>
  )
}

function CodeBlock({ code, filename, onCopy, copiedId }) {
  const id = React.useId()
  const isCopied = copiedId === id
  
  return (
    <div className="group relative mt-3 rounded-xl border border-zinc-800 bg-zinc-950 text-sm shadow-lg">
      {filename && (
        <div className="border-b border-zinc-800 px-4 py-2 text-xs text-zinc-500">{filename}</div>
      )}
      <pre id={id} className="overflow-x-auto p-4 text-xs leading-relaxed">
        <code className="text-zinc-300">{code}</code>
      </pre>
      <button
        onClick={() => onCopy(id, code)}
        className="absolute right-3 top-3 rounded-md border border-zinc-700 bg-zinc-800 px-2 py-1 text-xs text-zinc-300 opacity-0 transition-all group-hover:opacity-100 hover:text-emerald-300"
        aria-label={isCopied ? "Code copied" : "Copy code"}
      >
        {isCopied ? '✓ Copied' : 'Copy'}
      </button>
    </div>
  )
}

function TerminalTeaser() {
  const lines = [
    { text: 'My Project Developer CLI', style: 'font-bold text-emerald-400' },
    { text: 'Profile: dev | Port: 8000', style: 'text-zinc-500 text-xs' },
    { text: '', style: '' },
    { text: 'Use ↑/↓ to navigate, Enter to select', style: 'text-zinc-500 text-xs' },
    { text: '', style: '' },
    { text: '> 🚀 Start Services       :: Launch Docker containers', style: 'text-emerald-300' },
    { text: '  🛑 Stop Services        :: Shut down gracefully', style: 'text-zinc-300' },
    { text: '  🗄️  Database Operations  :: Migrations, seeding, backups', style: 'text-zinc-300' },
    { text: '  🛠️  Development Tools    :: Tests, linting, formatting', style: 'text-zinc-300' },
    { text: '  ⚡ Quick Actions        :: Common tasks and health checks', style: 'text-zinc-300' },
    { text: '  ❌ Exit', style: 'text-zinc-300' },
  ]
  
  return (
    <div className="font-mono text-xs leading-5">
      <div className="mb-3 flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-red-500" />
        <span className="h-3 w-3 rounded-full bg-yellow-500" />
        <span className="h-3 w-3 rounded-full bg-green-500" />
        <span className="ml-2 text-xs text-zinc-500">./main-cli.sh</span>
      </div>
      <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
        {lines.map((line, i) => (
          <div key={i} className={line.style || 'text-zinc-300'}>
            {line.text || '\u00A0'}
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-zinc-400">
        One command. All your tools. Never forget how your project works again.
      </p>
    </div>
  )
}

function TerminalExample({ lines }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 shadow-lg">
      <div className="font-mono text-xs leading-5">
        {lines.map((line, i) => (
          <div key={i} className={line.style || 'text-zinc-300'}>
            {line.text || '\u00A0'}
          </div>
        ))}
      </div>
    </div>
  )
}

function LiveRegion({ copiedId }) {
  return (
    <div aria-live="polite" aria-atomic="true" className="sr-only">
      {copiedId ? 'Code copied to clipboard' : ''}
    </div>
  )
}
