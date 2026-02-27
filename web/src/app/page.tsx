"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import skillsData from "@/data/skills.json";

type Skill = {
  id: string;
  name: string;
  category: string;
  group: string;
  description: string;
  path: string;
};

const groupColors: Record<string, string> = {
  design: "bg-pink-500/10 text-pink-500 border-pink-500/20",
  development: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  platform: "bg-green-500/10 text-green-500 border-green-500/20",
};

const categoryLabels: Record<string, string> = {
  animation: "Animation",
  copywriting: "Copywriting",
  marketing: "Marketing",
  tailwind: "Tailwind",
  ux: "UX",
  ui: "UI",
  accessibility: "Accessibility",
  "design-systems": "Design Systems",
  illustration: "Illustration",
  webdesign: "Web Design",
  figma: "Figma",
  "dev-process": "Dev Process",
  workflows: "Workflows",
  wordpress: "WordPress",
  flutter: "Flutter",
  swiftui: "SwiftUI",
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [copied, setCopied] = useState(false);

  const skills = skillsData.skills as Skill[];

  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      const matchesSearch =
        search === "" ||
        skill.name.toLowerCase().includes(search.toLowerCase()) ||
        skill.description.toLowerCase().includes(search.toLowerCase()) ||
        skill.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !selectedCategory || skill.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [skills, search, selectedCategory]);

  const groupedSkills = useMemo(() => {
    const groups: Record<string, Skill[]> = { design: [], development: [], platform: [] };
    filteredSkills.forEach((skill) => {
      if (groups[skill.group]) {
        groups[skill.group].push(skill);
      }
    });
    return groups;
  }, [filteredSkills]);

  const categories = useMemo(() => {
    const cats = new Set(skills.map((s) => s.category));
    return Array.from(cats).sort();
  }, [skills]);

  const copyInstallCommand = (skill: Skill) => {
    const cmd = `./install.sh --project ~/my-project --skills ${skill.id}`;
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <img 
                src="/logo.svg" 
                alt="Upskill Your Agent" 
                className="h-12 w-auto"
              />
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Upskill Your Agent</h1>
                <p className="text-muted-foreground">
                  A curated collection of {skills.length} AI agent skills
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <a
                  href="https://github.com/florian-koppelow/upskill-your-agent"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="space-y-6">
            <div>
              <Input
                placeholder="Search skills..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <h3 className="mb-3 text-sm font-medium text-muted-foreground">Categories</h3>
              <ScrollArea className="h-[400px]">
                <div className="space-y-1">
                  <Button
                    variant={selectedCategory === null ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(null)}
                  >
                    All Skills
                    <Badge variant="outline" className="ml-auto">
                      {skills.length}
                    </Badge>
                  </Button>
                  {categories.map((category) => {
                    const count = skills.filter((s) => s.category === category).length;
                    if (count === 0) return null;
                    return (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "secondary" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {categoryLabels[category] || category}
                        <Badge variant="outline" className="ml-auto">
                          {count}
                        </Badge>
                      </Button>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Quick Install</CardTitle>
              </CardHeader>
              <CardContent>
                <code className="text-xs bg-muted p-2 rounded block overflow-x-auto">
                  git clone https://github.com/florian-koppelow/upskill-your-agent.git
                  ~/upskill-your-agent
                </code>
              </CardContent>
            </Card>
          </aside>

          <div className="space-y-6">
            {selectedSkill ? (
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{selectedSkill.name}</CardTitle>
                      <div className="flex gap-2 mt-2">
                        <Badge className={groupColors[selectedSkill.group]}>
                          {selectedSkill.group}
                        </Badge>
                        <Badge variant="outline">
                          {categoryLabels[selectedSkill.category] || selectedSkill.category}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="ghost" onClick={() => setSelectedSkill(null)}>
                      Back
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{selectedSkill.description}</p>

                  <div className="space-y-2">
                    <h4 className="font-medium">Install this skill</h4>
                    <div className="flex gap-2">
                      <code className="flex-1 text-sm bg-muted p-3 rounded overflow-x-auto">
                        ./install.sh --project ~/my-project --skills {selectedSkill.id}
                      </code>
                      <Button onClick={() => copyInstallCommand(selectedSkill)}>
                        {copied ? "Copied!" : "Copy"}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">View source</h4>
                    <Button variant="outline" asChild>
                      <a
                        href={`https://github.com/florian-koppelow/upskill-your-agent/tree/main/${selectedSkill.path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View on GitHub
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Tabs defaultValue="all" className="w-full">
                <TabsList>
                  <TabsTrigger value="all">All ({filteredSkills.length})</TabsTrigger>
                  <TabsTrigger value="design">Design ({groupedSkills.design.length})</TabsTrigger>
                  <TabsTrigger value="development">
                    Development ({groupedSkills.development.length})
                  </TabsTrigger>
                  <TabsTrigger value="platform">
                    Platform ({groupedSkills.platform.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-6">
                  <SkillGrid skills={filteredSkills} onSelect={setSelectedSkill} />
                </TabsContent>
                <TabsContent value="design" className="mt-6">
                  <SkillGrid skills={groupedSkills.design} onSelect={setSelectedSkill} />
                </TabsContent>
                <TabsContent value="development" className="mt-6">
                  <SkillGrid skills={groupedSkills.development} onSelect={setSelectedSkill} />
                </TabsContent>
                <TabsContent value="platform" className="mt-6">
                  <SkillGrid skills={groupedSkills.platform} onSelect={setSelectedSkill} />
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground text-sm">
          <p>
            Skills sourced from{" "}
            <a href="https://github.com/ibelick/ui-skills" className="underline">
              ui-skills
            </a>
            ,{" "}
            <a href="https://github.com/jwilger/agent-skills" className="underline">
              jwilger/agent-skills
            </a>
            , and internal repositories.
          </p>
        </div>
      </footer>
    </div>
  );
}

function SkillGrid({
  skills,
  onSelect,
}: {
  skills: Skill[];
  onSelect: (skill: Skill) => void;
}) {
  if (skills.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No skills found matching your criteria.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {skills.map((skill) => (
        <Card
          key={skill.id}
          className="cursor-pointer hover:border-primary/50 transition-colors"
          onClick={() => onSelect(skill)}
        >
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <CardTitle className="text-base">{skill.name}</CardTitle>
              <Badge className={`${groupColors[skill.group]} text-xs`}>{skill.group}</Badge>
            </div>
            <Badge variant="outline" className="w-fit text-xs">
              {categoryLabels[skill.category] || skill.category}
            </Badge>
          </CardHeader>
          <CardContent>
            <CardDescription className="line-clamp-2">{skill.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
