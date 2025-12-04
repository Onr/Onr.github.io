## Gum CLI Development Rules
https://github.com/charmbracelet/gum

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
7. Prefer shallow, mostly flat menus with unique options.

### FOR EVERY MENU ITEM
- Show: action name + one-line description
- Include default values where applicable
- Use gum style for visual hierarchy

### PREVIEW + CONFIRM (MANDATORY)
- ALWAYS show the exact command before execution
- Use `gum confirm` for ANY impactful operation
- Allow abort at confirmation

### CRITICAL REMINDER FOR EVERY TASK
After completing ANY development task, you MUST:
1. Add/update corresponding action in ./main-cli.sh
2. Include descriptive label + help text
3. Add command preview + confirmation
4. Test the new menu option end-to-end
