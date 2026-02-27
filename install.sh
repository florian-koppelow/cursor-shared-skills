#!/bin/bash

# Upskill Your Agent - Installer
# Creates symlinks from a project's .cursor/skills/ to this shared repository

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILLS_DIR="$SCRIPT_DIR/skills"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Category groups
DESIGN_CATEGORIES="animation tailwind ux ui accessibility design-systems illustration webdesign figma"
DEV_CATEGORIES="dev-process workflows"
PLATFORM_CATEGORIES="wordpress flutter swiftui"

usage() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  --project PATH       Target project path (required for install)"
    echo "  --category CATS      Comma-separated categories to install"
    echo "  --group GROUP        Install category group: design, dev, platform, all"
    echo "  --skills SKILLS      Comma-separated skill names to install"
    echo "  --list               List available skills"
    echo "  --help               Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 --list"
    echo "  $0 --list --category dev-process"
    echo "  $0 --project ~/my-app --category workflows,accessibility"
    echo "  $0 --project ~/my-app --group design"
    echo "  $0 --project ~/my-app --skills tdd,commit,code-review"
}

list_skills() {
    local filter_category="$1"
    
    echo -e "${BLUE}Available Skills${NC}"
    echo "================"
    echo ""
    
    for category in $(ls "$SKILLS_DIR"); do
        if [ -d "$SKILLS_DIR/$category" ]; then
            if [ -n "$filter_category" ] && [ "$category" != "$filter_category" ]; then
                continue
            fi
            
            echo -e "${GREEN}$category/${NC}"
            for skill in $(ls "$SKILLS_DIR/$category"); do
                if [ -d "$SKILLS_DIR/$category/$skill" ] && [ -f "$SKILLS_DIR/$category/$skill/SKILL.md" ]; then
                    echo "  - $skill"
                fi
            done
            echo ""
        fi
    done
}

find_skill() {
    local skill_name="$1"
    
    for category in $(ls "$SKILLS_DIR"); do
        if [ -d "$SKILLS_DIR/$category/$skill_name" ]; then
            echo "$category/$skill_name"
            return 0
        fi
    done
    
    return 1
}

install_skill() {
    local project_path="$1"
    local category="$2"
    local skill="$3"
    
    local source="$SKILLS_DIR/$category/$skill"
    local target="$project_path/.cursor/skills/$skill"
    
    if [ ! -d "$source" ]; then
        echo -e "${RED}Error: Skill not found: $category/$skill${NC}"
        return 1
    fi
    
    # Create .cursor/skills if it doesn't exist
    mkdir -p "$project_path/.cursor/skills"
    
    # Remove existing (symlink or directory)
    if [ -L "$target" ]; then
        rm "$target"
    elif [ -d "$target" ]; then
        echo -e "${YELLOW}Warning: $skill already exists as directory, skipping${NC}"
        return 0
    fi
    
    # Create symlink
    ln -s "$source" "$target"
    echo -e "${GREEN}✓${NC} Installed: $skill"
}

install_category() {
    local project_path="$1"
    local category="$2"
    
    if [ ! -d "$SKILLS_DIR/$category" ]; then
        echo -e "${RED}Error: Category not found: $category${NC}"
        return 1
    fi
    
    echo -e "${BLUE}Installing category: $category${NC}"
    
    for skill in $(ls "$SKILLS_DIR/$category"); do
        if [ -d "$SKILLS_DIR/$category/$skill" ] && [ -f "$SKILLS_DIR/$category/$skill/SKILL.md" ]; then
            install_skill "$project_path" "$category" "$skill"
        fi
    done
}

# Parse arguments
PROJECT_PATH=""
CATEGORIES=""
GROUP=""
SKILLS=""
LIST_MODE=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --project)
            PROJECT_PATH="$2"
            shift 2
            ;;
        --category)
            CATEGORIES="$2"
            shift 2
            ;;
        --group)
            GROUP="$2"
            shift 2
            ;;
        --skills)
            SKILLS="$2"
            shift 2
            ;;
        --list)
            LIST_MODE=true
            shift
            ;;
        --help)
            usage
            exit 0
            ;;
        *)
            echo -e "${RED}Unknown option: $1${NC}"
            usage
            exit 1
            ;;
    esac
done

# List mode
if [ "$LIST_MODE" = true ]; then
    list_skills "$CATEGORIES"
    exit 0
fi

# Require project path for installation
if [ -z "$PROJECT_PATH" ]; then
    echo -e "${RED}Error: --project is required${NC}"
    usage
    exit 1
fi

# Expand ~ in path
PROJECT_PATH="${PROJECT_PATH/#\~/$HOME}"

if [ ! -d "$PROJECT_PATH" ]; then
    echo -e "${RED}Error: Project path does not exist: $PROJECT_PATH${NC}"
    exit 1
fi

echo -e "${BLUE}Installing skills to: $PROJECT_PATH${NC}"
echo ""

# Install by group
if [ -n "$GROUP" ]; then
    case $GROUP in
        design)
            CATEGORIES="$DESIGN_CATEGORIES"
            ;;
        dev)
            CATEGORIES="$DEV_CATEGORIES"
            ;;
        platform)
            CATEGORIES="$PLATFORM_CATEGORIES"
            ;;
        all)
            CATEGORIES="$DESIGN_CATEGORIES $DEV_CATEGORIES $PLATFORM_CATEGORIES"
            ;;
        *)
            echo -e "${RED}Unknown group: $GROUP${NC}"
            exit 1
            ;;
    esac
    CATEGORIES=$(echo "$CATEGORIES" | tr ' ' ',')
fi

# Install by categories
if [ -n "$CATEGORIES" ]; then
    IFS=',' read -ra CATEGORY_ARRAY <<< "$CATEGORIES"
    for category in "${CATEGORY_ARRAY[@]}"; do
        category=$(echo "$category" | xargs)  # trim whitespace
        install_category "$PROJECT_PATH" "$category"
    done
fi

# Install specific skills
if [ -n "$SKILLS" ]; then
    IFS=',' read -ra SKILL_ARRAY <<< "$SKILLS"
    for skill in "${SKILL_ARRAY[@]}"; do
        skill=$(echo "$skill" | xargs)  # trim whitespace
        skill_path=$(find_skill "$skill")
        if [ -n "$skill_path" ]; then
            category=$(dirname "$skill_path")
            install_skill "$PROJECT_PATH" "$category" "$skill"
        else
            echo -e "${RED}Error: Skill not found: $skill${NC}"
        fi
    done
fi

echo ""
echo -e "${GREEN}Done!${NC}"
