'use client';

import * as React from 'react';
import {
  Bell,
  Check,
  ChevronRight,
  Cloud,
  Command as CommandIcon,
  Copy,
  Download,
  FileText,
  Heart,
  Home,
  Info,
  Mail,
  Plus,
  Search,
  Settings,
  Sparkles,
  Star,
  Trash2,
  User,
  Volume2,
} from 'lucide-react';

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { cn } from '@/shared/lib/utils/cn';
import { Button } from '@/shared/ui/Button/Button';

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/shared/ui/lib/Accordion';
import { Alert, AlertTitle, AlertDescription } from '@/shared/ui/lib/Alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shared/ui/lib/AlertDialog';
import { AspectRatio } from '@/shared/ui/lib/AspectRatio';
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from '@/shared/ui/lib/Avatar';
import { Badge } from '@/shared/ui/lib/Badge';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shared/ui/lib/Breadcrumb';
import { ButtonGroup } from '@/shared/ui/lib/ButtonGroup';
import { Calendar } from '@/shared/ui/lib/Calendar';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/shared/ui/lib/Card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/shared/ui/lib/Carousel';
import { Checkbox } from '@/shared/ui/lib/Checkbox';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/shared/ui/lib/Collapsible';
import { CopyButton } from '@/shared/ui/lib/CopyButton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/lib/Dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/ui/lib/Drawer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/lib/DropdownMenu';
import { EmptyState } from '@/shared/ui/lib/EmptyState';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/shared/ui/lib/HoverCard';
import { Input } from '@/shared/ui/lib/Input';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/shared/ui/lib/InputGroup';
import { Kbd, KbdCombo } from '@/shared/ui/lib/Kbd';
import { Label } from '@/shared/ui/lib/Label';
import { ListItem } from '@/shared/ui/lib/ListItem';
import { LoadingBar } from '@/shared/ui/lib/LoadingBar';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/shared/ui/lib/Menubar';
import { NativeSelect, NativeSelectOption } from '@/shared/ui/lib/NativeSelect';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/shared/ui/lib/NavigationMenu';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/shared/ui/lib/Pagination';
import { Popover, PopoverTrigger, PopoverContent } from '@/shared/ui/lib/Popover';
import { Progress } from '@/shared/ui/lib/Progress';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/lib/RadioGroup';
import { ScrollArea } from '@/shared/ui/lib/ScrollArea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/lib/Select';
import { Separator } from '@/shared/ui/lib/Separator';
import { SettingRow } from '@/shared/ui/lib/SettingRow';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/lib/Sheet';
import { Skeleton } from '@/shared/ui/lib/Skeleton';
import { Slider } from '@/shared/ui/lib/Slider';
import { SliderRow } from '@/shared/ui/lib/SliderRow';
import { SlidingTabs, SlidingTabsList, SlidingTabsTrigger, SlidingTabsContent } from '@/shared/ui/lib/SlidingTabs';
import { Spinner } from '@/shared/ui/lib/Spinner';
import { StatusCard } from '@/shared/ui/lib/StatusCard';
import { Switch } from '@/shared/ui/lib/Switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/lib/Table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/ui/lib/Tabs';
import { Textarea } from '@/shared/ui/lib/Textarea';
import { Toggle } from '@/shared/ui/lib/Toggle';
import { ToggleGroup, ToggleGroupItem } from '@/shared/ui/lib/ToggleGroup';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/shared/ui/lib/Tooltip';

import { ApiKeyInput } from '@/shared/ui/lib/ApiKeyInput';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/shared/ui/lib/Chart';
import { Combobox } from '@/shared/ui/lib/Combobox';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shared/ui/lib/Command';
import { ConfirmDialog } from '@/shared/ui/lib/ConfirmDialog';
import { ConfirmDeleteDialog } from '@/shared/ui/lib/ConfirmDeleteDialog';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/shared/ui/lib/ContextMenu';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/lib/Form';
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@/shared/ui/lib/InputOtp';
import { PageHeader } from '@/shared/ui/lib/PageHeader';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/shared/ui/lib/Resizable';
import { RoundedScrollList } from '@/shared/ui/lib/RoundedScrollList';
import { SectionCard } from '@/shared/ui/lib/SectionCard';
import { SectionContent } from '@/shared/ui/lib/SectionContent';
import { SlidingNav } from '@/shared/ui/lib/SlidingNav';
import { SlidingSelect } from '@/shared/ui/lib/SlidingSelect';
import { Toaster } from '@/shared/ui/lib/Sonner';
import { VoiceListItem } from '@/shared/ui/lib/VoiceListItem';

// ---------------------------------------------------------------------------
// /gallery — debug galeria komponentow shared/ui/lib + zunifikowany Button.
// Cel: wizualne potwierdzenie renderu w kolorach papier(#f3efe6)/koral(#e87058).
// Pominiete (app-only / montuja globalne efekty): SplashScreen, NeonOrbs, AppIcon.
// Pominiete (trudne API / app-domain): SlidingMenubar, SlidingCombobox,
// SlidingCommand, SlidingContextMenu, SlidingDropdownMenu, SlidingScrollList,
// OverflowMenubar.
// ---------------------------------------------------------------------------

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-[var(--line)] py-10">
      <header className="mb-6">
        <h2 className="text-[length:var(--h2-font-size)] font-bold text-foreground">{title}</h2>
        {description && <p className="mt-1 text-[length:var(--small-font-size)] text-muted-foreground">{description}</p>}
      </header>
      {children}
    </section>
  );
}

function Row({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('flex flex-wrap items-center gap-3', className)}>{children}</div>;
}

function Tile({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4">
      <span className="text-[length:var(--smaller-font-size)] uppercase tracking-wider text-dim">{label}</span>
      {children}
    </div>
  );
}

const BUTTON_VARIANTS = [
  'default',
  'accent',
  'primary',
  'destructive',
  'outline',
  'secondary',
  'ghost',
  'link',
] as const;

const BADGE_VARIANTS = ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'] as const;

const CHART_DATA = [
  { day: 'Pon', renders: 18 },
  { day: 'Wt', renders: 32 },
  { day: 'Sr', renders: 24 },
  { day: 'Czw', renders: 41 },
];

const CHART_CONFIG = {
  renders: { label: 'Rendery', color: 'var(--accent)' },
} satisfies ChartConfig;

const COMBOBOX_OPTIONS = [
  { value: 'pl', label: 'Polski' },
  { value: 'en', label: 'English' },
  { value: 'ja', label: '日本語' },
];

const SLIDING_SELECT_ITEMS = [
  { value: '480', label: '480p' },
  { value: '720', label: '720p' },
  { value: '1080', label: '1080p' },
];

const SLIDING_NAV_ITEMS = [
  { key: 'home', content: 'Start' },
  { key: 'docs', content: 'Dokumentacja' },
  { key: 'about', content: 'O nas' },
];

export default function GalleryPage() {
  const [sliderVal, setSliderVal] = React.useState(40);
  const [switchOn, setSwitchOn] = React.useState(true);
  const [progress, setProgress] = React.useState(66);
  const [comboValue, setComboValue] = React.useState('pl');
  const [otp, setOtp] = React.useState('');
  const [slidingSelectValue, setSlidingSelectValue] = React.useState('720');
  const [slidingNavKey, setSlidingNavKey] = React.useState('home');
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const form = useForm<{ username: string }>({ defaultValues: { username: '' } });

  return (
    <TooltipProvider>
      <main className="mx-auto max-w-5xl px-6 py-12 text-foreground">
        <header className="mb-4">
          <h1 className="text-[length:var(--h1-font-size)] font-extrabold tracking-tight">Galeria komponentow</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Debug-render wszystkich komponentow z <code>shared/ui/lib</code> + zunifikowanego{' '}
            <code>Button</code>. Paleta: papier <code>#f3efe6</code> / koral <code>#e87058</code>.
          </p>
        </header>

        {/* ---------------------------------------------------------------- Buttons */}
        <Section title="Buttons" description="warianty x rozmiary + ikony + disabled">
          <div className="space-y-6">
            {BUTTON_VARIANTS.map((variant) => (
              <Row key={variant}>
                <span className="w-24 shrink-0 text-[length:var(--small-font-size)] text-dim">{variant}</span>
                <Button variant={variant} size="sm">sm</Button>
                <Button variant={variant} size="default">default</Button>
                <Button variant={variant} size="lg">lg</Button>
                <Button variant={variant} size="pill">pill</Button>
                <Button variant={variant} disabled>disabled</Button>
              </Row>
            ))}
            <Row>
              <span className="w-24 shrink-0 text-[length:var(--small-font-size)] text-dim">icons</span>
              <Button size="icon-sm" aria-label="add"><Plus /></Button>
              <Button size="icon" aria-label="add"><Plus /></Button>
              <Button size="icon-lg" aria-label="add"><Plus /></Button>
              <Button variant="accent" size="icon" aria-label="star"><Star /></Button>
              <Button variant="outline" size="icon" aria-label="settings"><Settings /></Button>
              <Button variant="ghost" size="icon" aria-label="heart"><Heart /></Button>
            </Row>
            <Row>
              <span className="w-24 shrink-0 text-[length:var(--small-font-size)] text-dim">w/ icon</span>
              <Button variant="accent"><Download /> Pobierz</Button>
              <Button variant="primary"><Sparkles /> Generuj</Button>
              <Button variant="outline"><Mail /> Wyslij</Button>
            </Row>
          </div>
        </Section>

        {/* ---------------------------------------------------------------- Badges */}
        <Section title="Badges" description="wszystkie warianty">
          <Row>
            {BADGE_VARIANTS.map((variant) => (
              <Badge key={variant} variant={variant}>{variant}</Badge>
            ))}
            <Badge variant="default"><Check /> ok</Badge>
            <Badge variant="destructive"><Trash2 /> usun</Badge>
          </Row>
        </Section>

        {/* ---------------------------------------------------------------- Form */}
        <Section title="Form" description="Input, Textarea, Checkbox, Switch, Radio, Slider, Select, NativeSelect">
          <div className="grid gap-4 md:grid-cols-2">
            <Tile label="Input">
              <Label htmlFor="g-input">Email</Label>
              <Input id="g-input" placeholder="you@example.com" />
            </Tile>
            <Tile label="InputGroup">
              <InputGroup>
                <InputGroupAddon><Search /></InputGroupAddon>
                <InputGroupInput placeholder="Szukaj..." />
              </InputGroup>
            </Tile>
            <Tile label="Textarea">
              <Textarea placeholder="Twoja wiadomosc..." rows={3} />
            </Tile>
            <Tile label="Checkbox">
              <div className="flex items-center gap-2">
                <Checkbox id="g-cb" defaultChecked />
                <Label htmlFor="g-cb">Zaakceptuj warunki</Label>
              </div>
            </Tile>
            <Tile label="Switch">
              <div className="flex items-center gap-2">
                <Switch checked={switchOn} onCheckedChange={setSwitchOn} id="g-sw" />
                <Label htmlFor="g-sw">{switchOn ? 'Wlaczony' : 'Wylaczony'}</Label>
              </div>
            </Tile>
            <Tile label="RadioGroup">
              <RadioGroup defaultValue="a" className="flex flex-col gap-2">
                <div className="flex items-center gap-2"><RadioGroupItem value="a" id="g-r1" /><Label htmlFor="g-r1">Opcja A</Label></div>
                <div className="flex items-center gap-2"><RadioGroupItem value="b" id="g-r2" /><Label htmlFor="g-r2">Opcja B</Label></div>
              </RadioGroup>
            </Tile>
            <Tile label="Slider">
              <Slider value={[sliderVal]} onValueChange={([v]) => setSliderVal(v)} min={0} max={100} step={1} />
              <span className="text-[length:var(--small-font-size)] text-dim tabular-nums">{sliderVal}</span>
            </Tile>
            <Tile label="SliderRow">
              <SliderRow
                label="Glosnosc"
                icon={Volume2}
                value={sliderVal}
                onValueChange={setSliderVal}
                min={0}
                max={100}
                step={1}
                formatValue={(v) => `${v}%`}
              />
            </Tile>
            <Tile label="Select">
              <Select defaultValue="pl">
                <SelectTrigger className="w-full"><SelectValue placeholder="Jezyk" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="pl">Polski</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ja">日本語</SelectItem>
                </SelectContent>
              </Select>
            </Tile>
            <Tile label="NativeSelect">
              <NativeSelect defaultValue="1">
                <NativeSelectOption value="1">Jeden</NativeSelectOption>
                <NativeSelectOption value="2">Dwa</NativeSelectOption>
                <NativeSelectOption value="3">Trzy</NativeSelectOption>
              </NativeSelect>
            </Tile>
            <Tile label="SettingRow">
              <SettingRow label="Powiadomienia" description="Wlacz push" checked={switchOn} onCheckedChange={setSwitchOn} />
            </Tile>
          </div>
        </Section>

        {/* ---------------------------------------------------------------- Feedback */}
        <Section title="Feedback" description="Alert, Progress, Spinner, Skeleton, LoadingBar, StatusCard, EmptyState">
          <div className="space-y-4">
            <Alert>
              <Info />
              <AlertTitle>Informacja</AlertTitle>
              <AlertDescription>To jest standardowy alert.</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <Trash2 />
              <AlertTitle>Uwaga</AlertTitle>
              <AlertDescription>Operacja jest nieodwracalna.</AlertDescription>
            </Alert>
            <div className="grid gap-4 md:grid-cols-2">
              <Tile label="Progress">
                <Progress value={progress} />
                <Button size="sm" variant="outline" onClick={() => setProgress((p) => (p >= 100 ? 0 : p + 20))}>
                  +20%
                </Button>
              </Tile>
              <Tile label="LoadingBar">
                <div className="relative h-8 overflow-hidden rounded-md border border-[var(--line)]">
                  <LoadingBar active />
                </div>
              </Tile>
              <Tile label="Spinner">
                <Row>
                  <Spinner size="sm" />
                  <Spinner size="default" />
                  <Spinner size="lg" />
                  <Spinner size="xl" />
                </Row>
              </Tile>
              <Tile label="Skeleton">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </Tile>
              <Tile label="StatusCard">
                <StatusCard icon={Cloud} label="Status" value="Online" sublabel="99.9% uptime" active />
              </Tile>
              <Tile label="EmptyState">
                <EmptyState icon={FileText} message="Brak plikow" description="Dodaj pierwszy plik aby zaczac." />
              </Tile>
            </div>
          </div>
        </Section>

        {/* ---------------------------------------------------------------- Overlay */}
        <Section title="Overlay" description="Dialog, AlertDialog, Popover, Tooltip, HoverCard, DropdownMenu, Sheet, Drawer">
          <Row>
            <Dialog>
              <DialogTrigger asChild><Button variant="outline">Dialog</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Tytul dialogu</DialogTitle>
                  <DialogDescription>Opis zawartosci dialogu.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="accent">Zapisz</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <AlertDialog>
              <AlertDialogTrigger asChild><Button variant="destructive">AlertDialog</Button></AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Na pewno?</AlertDialogTitle>
                  <AlertDialogDescription>Tej operacji nie da sie cofnac.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Anuluj</AlertDialogCancel>
                  <AlertDialogAction>Usun</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Popover>
              <PopoverTrigger asChild><Button variant="outline">Popover</Button></PopoverTrigger>
              <PopoverContent>
                <p className="text-[length:var(--small-font-size)]">Tresc popovera z dodatkowymi opcjami.</p>
              </PopoverContent>
            </Popover>

            <Tooltip>
              <TooltipTrigger asChild><Button variant="ghost">Tooltip</Button></TooltipTrigger>
              <TooltipContent>Podpowiedz</TooltipContent>
            </Tooltip>

            <HoverCard>
              <HoverCardTrigger asChild><Button variant="ghost">HoverCard</Button></HoverCardTrigger>
              <HoverCardContent>
                <p className="text-[length:var(--small-font-size)]">Bogatszy podglad po najechaniu.</p>
              </HoverCardContent>
            </HoverCard>

            <DropdownMenu>
              <DropdownMenuTrigger asChild><Button variant="outline">Dropdown</Button></DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Konto</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem><User /> Profil</DropdownMenuItem>
                <DropdownMenuItem><Settings /> Ustawienia</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Sheet>
              <SheetTrigger asChild><Button variant="outline">Sheet</Button></SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Panel boczny</SheetTitle>
                  <SheetDescription>Wysuwany panel ustawien.</SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>

            <Drawer>
              <DrawerTrigger asChild><Button variant="outline">Drawer</Button></DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Szuflada</DrawerTitle>
                  <DrawerDescription>Wysuwana od dolu.</DrawerDescription>
                </DrawerHeader>
              </DrawerContent>
            </Drawer>
          </Row>
        </Section>

        {/* ---------------------------------------------------------------- Navigation */}
        <Section title="Navigation" description="Tabs, SlidingTabs, Breadcrumb, Pagination, Menubar, NavigationMenu">
          <div className="space-y-6">
            <Tile label="Tabs">
              <Tabs defaultValue="t1">
                <TabsList>
                  <TabsTrigger value="t1">Pierwsza</TabsTrigger>
                  <TabsTrigger value="t2">Druga</TabsTrigger>
                  <TabsTrigger value="t3">Trzecia</TabsTrigger>
                </TabsList>
                <TabsContent value="t1">Zawartosc pierwszej.</TabsContent>
                <TabsContent value="t2">Zawartosc drugiej.</TabsContent>
                <TabsContent value="t3">Zawartosc trzeciej.</TabsContent>
              </Tabs>
            </Tile>

            <Tile label="SlidingTabs">
              <SlidingTabs defaultValue="s1">
                <SlidingTabsList>
                  <SlidingTabsTrigger value="s1">Konto</SlidingTabsTrigger>
                  <SlidingTabsTrigger value="s2">Bezpieczenstwo</SlidingTabsTrigger>
                  <SlidingTabsTrigger value="s3">Powiadomienia</SlidingTabsTrigger>
                </SlidingTabsList>
                <SlidingTabsContent value="s1">Panel konta.</SlidingTabsContent>
                <SlidingTabsContent value="s2">Panel bezpieczenstwa.</SlidingTabsContent>
                <SlidingTabsContent value="s3">Panel powiadomien.</SlidingTabsContent>
              </SlidingTabs>
            </Tile>

            <Tile label="Breadcrumb">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem><BreadcrumbLink href="#"><Home /></BreadcrumbLink></BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem><BreadcrumbLink href="#">Projekty</BreadcrumbLink></BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem><BreadcrumbPage>MangaShift</BreadcrumbPage></BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </Tile>

            <Tile label="Pagination">
              <Pagination>
                <PaginationContent>
                  <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                  <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationEllipsis /></PaginationItem>
                  <PaginationItem><PaginationNext href="#" /></PaginationItem>
                </PaginationContent>
              </Pagination>
            </Tile>

            <Tile label="Menubar">
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>Plik</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>Nowy</MenubarItem>
                    <MenubarItem>Otworz</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Zapisz</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger>Edycja</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>Cofnij</MenubarItem>
                    <MenubarItem>Ponow</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </Tile>

            <Tile label="NavigationMenu">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="#">Start</NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="#">Dokumentacja</NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </Tile>
          </div>
        </Section>

        {/* ---------------------------------------------------------------- Data */}
        <Section title="Data" description="Card, Table, Accordion, Avatar, Separator, ScrollArea, Calendar, Carousel">
          <div className="grid gap-4 md:grid-cols-2">
            <Tile label="Card">
              <Card>
                <CardHeader>
                  <CardTitle>Plan Pro</CardTitle>
                  <CardDescription>Wszystkie funkcje odblokowane.</CardDescription>
                </CardHeader>
                <CardContent className="text-[length:var(--small-font-size)] text-muted-foreground">
                  Nielimitowane renderowanie i priorytetowe wsparcie.
                </CardContent>
                <CardFooter>
                  <Button variant="accent" size="sm">Wybierz</Button>
                </CardFooter>
              </Card>
            </Tile>

            <Tile label="Table">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plik</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>strona-01.png</TableCell>
                    <TableCell><Badge>gotowe</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>strona-02.png</TableCell>
                    <TableCell><Badge variant="secondary">w toku</Badge></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Tile>

            <Tile label="Accordion">
              <Accordion type="single" collapsible>
                <AccordionItem value="a1">
                  <AccordionTrigger>Czym jest MangaShift?</AccordionTrigger>
                  <AccordionContent>Pipeline manga do wideo.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="a2">
                  <AccordionTrigger>Czy jest darmowy?</AccordionTrigger>
                  <AccordionContent>Tak, beta jest darmowa.</AccordionContent>
                </AccordionItem>
              </Accordion>
            </Tile>

            <Tile label="Avatar">
              <Row>
                <Avatar><AvatarFallback>MS</AvatarFallback></Avatar>
                <Avatar size="lg"><AvatarFallback><User /></AvatarFallback></Avatar>
                <AvatarGroup>
                  <Avatar><AvatarFallback>A</AvatarFallback></Avatar>
                  <Avatar><AvatarFallback>B</AvatarFallback></Avatar>
                  <AvatarGroupCount>+3</AvatarGroupCount>
                </AvatarGroup>
              </Row>
            </Tile>

            <Tile label="Separator">
              <div className="text-[length:var(--small-font-size)]">Gora</div>
              <Separator />
              <div className="text-[length:var(--small-font-size)]">Dol</div>
            </Tile>

            <Tile label="ScrollArea">
              <ScrollArea className="h-28 w-full rounded-md border border-[var(--line)] p-3">
                <div className="space-y-1 text-[length:var(--small-font-size)]">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <p key={i}>Wiersz przewijanej listy {i + 1}</p>
                  ))}
                </div>
              </ScrollArea>
            </Tile>

            <Tile label="Calendar">
              <Calendar mode="single" className="rounded-md border border-[var(--line)]" />
            </Tile>

            <Tile label="Carousel">
              <Carousel className="w-full max-w-xs">
                <CarouselContent>
                  {[1, 2, 3].map((n) => (
                    <CarouselItem key={n}>
                      <div className="flex h-24 items-center justify-center rounded-md border border-[var(--line)] bg-[var(--surface-2)] text-2xl font-bold">
                        {n}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </Tile>
          </div>
        </Section>

        {/* ---------------------------------------------------------------- Misc */}
        <Section title="Misc" description="Kbd, CopyButton, AspectRatio, Toggle, ToggleGroup, Collapsible, ListItem, ButtonGroup">
          <div className="grid gap-4 md:grid-cols-2">
            <Tile label="Kbd / KbdCombo">
              <Row>
                <Kbd>Esc</Kbd>
                <KbdCombo keys={['Ctrl', 'K']} />
                <span className="inline-flex items-center gap-1"><CommandIcon size={12} /><Kbd>K</Kbd></span>
              </Row>
            </Tile>

            <Tile label="CopyButton">
              <Row>
                <CopyButton text="mangashift" />
                <span className="text-[length:var(--small-font-size)] text-dim">kopiuje tekst</span>
              </Row>
            </Tile>

            <Tile label="AspectRatio 16:9">
              <AspectRatio ratio={16 / 9}>
                <div className="flex h-full w-full items-center justify-center rounded-md border border-[var(--line)] bg-[var(--surface-2)]">
                  16:9
                </div>
              </AspectRatio>
            </Tile>

            <Tile label="Toggle">
              <Row>
                <Toggle aria-label="bold"><Star /></Toggle>
                <Toggle variant="outline" aria-label="like"><Heart /> Lubie</Toggle>
              </Row>
            </Tile>

            <Tile label="ToggleGroup">
              <ToggleGroup type="single" defaultValue="b" variant="outline">
                <ToggleGroupItem value="a">A</ToggleGroupItem>
                <ToggleGroupItem value="b">B</ToggleGroupItem>
                <ToggleGroupItem value="c">C</ToggleGroupItem>
              </ToggleGroup>
            </Tile>

            <Tile label="ButtonGroup">
              <ButtonGroup>
                <Button variant="outline">Lewy</Button>
                <Button variant="outline">Srodek</Button>
                <Button variant="outline">Prawy</Button>
              </ButtonGroup>
            </Tile>

            <Tile label="Collapsible">
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm"><ChevronRight /> Rozwin</Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2 text-[length:var(--small-font-size)] text-muted-foreground">
                  Ukryta zawartosc collapsible.
                </CollapsibleContent>
              </Collapsible>
            </Tile>

            <Tile label="ListItem">
              <div className="space-y-1">
                <ListItem title="Glos: Aiko" subtitle="ja-JP" badge="active" actionIcon={Bell} onAction={() => {}} actionLabel="ping" />
                <ListItem title="Glos: Ren" subtitle="ja-JP" selectable onDelete={() => {}} />
              </div>
            </Tile>
          </div>
        </Section>

        {/* ---------------------------------------------------------------- Charts */}
        <Section title="Charts" description="Chart (recharts BarChart) + ChartTooltip">
          <Tile label="Bar chart">
            <ChartContainer config={CHART_CONFIG} className="h-48 w-full">
              <BarChart data={CHART_DATA}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="renders" fill="var(--color-renders)" radius={6} />
              </BarChart>
            </ChartContainer>
          </Tile>
        </Section>

        {/* ---------------------------------------------------------------- Command palette */}
        <Section title="Command / Combobox / OTP" description="Command, Combobox, InputOTP">
          <div className="grid gap-4 md:grid-cols-2">
            <Tile label="Command">
              <Command className="rounded-lg border border-[var(--line)]">
                <CommandInput placeholder="Wpisz polecenie..." />
                <CommandList>
                  <CommandEmpty>Brak wynikow.</CommandEmpty>
                  <CommandGroup>
                    <CommandItem><Home /> Strona glowna</CommandItem>
                    <CommandItem><Settings /> Ustawienia</CommandItem>
                    <CommandItem><Search /> Szukaj</CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </Tile>

            <Tile label="Combobox">
              <Combobox
                options={COMBOBOX_OPTIONS}
                value={comboValue}
                onValueChange={setComboValue}
                placeholder="Wybierz jezyk..."
              />
            </Tile>

            <Tile label="InputOTP">
              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </Tile>
          </div>
        </Section>

        {/* ---------------------------------------------------------------- Sliding */}
        <Section title="Sliding" description="SlidingSelect, SlidingNav (pill follows selection)">
          <div className="grid gap-4 md:grid-cols-2">
            <Tile label="SlidingSelect">
              <SlidingSelect
                items={SLIDING_SELECT_ITEMS}
                value={slidingSelectValue}
                onValueChange={setSlidingSelectValue}
                placeholder="Jakosc"
              />
            </Tile>

            <Tile label="SlidingNav">
              <SlidingNav
                items={SLIDING_NAV_ITEMS}
                activeKey={slidingNavKey}
                onSelect={setSlidingNavKey}
                orientation="horizontal"
                itemClassName="px-3 py-1.5 text-[length:var(--small-font-size)]"
              />
            </Tile>
          </div>
        </Section>

        {/* ---------------------------------------------------------------- Resizable */}
        <Section title="Resizable" description="ResizablePanelGroup (2 panele poziomo)">
          <Tile label="Resizable">
            <ResizablePanelGroup orientation="horizontal" className="h-32 rounded-md border border-[var(--line)]">
              <ResizablePanel defaultSize={50}>
                <div className="flex h-full items-center justify-center p-4 text-[length:var(--small-font-size)]">Lewy panel</div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={50}>
                <div className="flex h-full items-center justify-center p-4 text-[length:var(--small-font-size)]">Prawy panel</div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </Tile>
        </Section>

        {/* ---------------------------------------------------------------- App-store driven */}
        <Section title="App-store driven" description="PageHeader, SectionCard, SectionContent, StatusCard (uzywaja useAppStore stub)">
          <div className="space-y-4">
            <PageHeader icon={Sparkles} title="Panel renderowania" description="Status zadania">
              <Button variant="accent" size="sm"><Plus /> Nowy</Button>
            </PageHeader>

            <SectionCard icon={Settings} title="Ustawienia" description="Konfiguracja eksportu">
              <SectionContent>
                <p className="text-[length:var(--small-font-size)] text-muted-foreground">
                  Zawartosc karty sekcji z naglowkiem i akcentem.
                </p>
              </SectionContent>
            </SectionCard>
          </div>
        </Section>

        {/* ---------------------------------------------------------------- Form (react-hook-form) */}
        <Section title="Form" description="Form + FormField (react-hook-form)">
          <Tile label="Form">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(() => {})} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  rules={{ required: 'Pole wymagane' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nazwa uzytkownika</FormLabel>
                      <FormControl>
                        <Input placeholder="manga-shift" {...field} />
                      </FormControl>
                      <FormDescription>Twoja publiczna nazwa.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" variant="accent" size="sm">Zapisz</Button>
              </form>
            </Form>
          </Tile>
        </Section>

        {/* ---------------------------------------------------------------- Domain inputs */}
        <Section title="Domain inputs" description="ApiKeyInput, VoiceListItem, ContextMenu, RoundedScrollList">
          <div className="grid gap-4 md:grid-cols-2">
            <Tile label="ApiKeyInput">
              <ApiKeyInput onSave={() => {}} placeholder="sk-..." />
            </Tile>

            <Tile label="VoiceListItem">
              <div className="space-y-1">
                <VoiceListItem title="Aiko" subtitle="ja-JP" selected onSelect={() => {}} onPlay={() => {}} />
                <VoiceListItem title="Ren" subtitle="ja-JP" selected={false} onSelect={() => {}} />
              </div>
            </Tile>

            <Tile label="ContextMenu">
              <ContextMenu>
                <ContextMenuTrigger className="flex h-20 items-center justify-center rounded-md border border-dashed border-[var(--line)] text-[length:var(--small-font-size)] text-dim">
                  Kliknij prawym
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuLabel>Akcje</ContextMenuLabel>
                  <ContextMenuSeparator />
                  <ContextMenuItem><Copy /> Kopiuj</ContextMenuItem>
                  <ContextMenuItem><Download /> Pobierz</ContextMenuItem>
                  <ContextMenuItem variant="destructive"><Trash2 /> Usun</ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            </Tile>

            <Tile label="RoundedScrollList">
              <div className="h-28">
                <RoundedScrollList className="h-full">
                  <div className="space-y-1 text-[length:var(--small-font-size)]">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <p key={i} className="rounded-md px-2 py-1 hover:bg-[var(--overlay)]">Element {i + 1}</p>
                    ))}
                  </div>
                </RoundedScrollList>
              </div>
            </Tile>
          </div>
        </Section>

        {/* ---------------------------------------------------------------- Dialogs + toasts */}
        <Section title="Dialogs + Toasts" description="ConfirmDialog, ConfirmDeleteDialog, Sonner (toast)">
          <Row>
            <Button variant="outline" onClick={() => setConfirmOpen(true)}>ConfirmDialog</Button>
            <Button variant="destructive" onClick={() => setDeleteOpen(true)}>ConfirmDeleteDialog</Button>
            <Button variant="accent" onClick={() => toast('Render zakonczony', { description: 'Wideo gotowe do pobrania.' })}>
              <Bell /> Pokaz toast
            </Button>
          </Row>

          <ConfirmDialog
            open={confirmOpen}
            onOpenChange={setConfirmOpen}
            icon={Info}
            title="Potwierdz akcje"
            description="Czy chcesz kontynuowac renderowanie?"
            confirmLabel="Tak"
            cancelLabel="Anuluj"
            onConfirm={() => setConfirmOpen(false)}
          />

          <ConfirmDeleteDialog
            open={deleteOpen}
            onOpenChange={setDeleteOpen}
            title="Usunac projekt?"
            description="Tej operacji nie da sie cofnac."
            onConfirm={() => setDeleteOpen(false)}
          />
        </Section>

        <Toaster />

        <footer className="border-t border-[var(--line)] py-10 text-[length:var(--small-font-size)] text-dim">
          {/* SplashScreen / NeonOrbs / AppIcon pominiete — app boot / app-only. */}
          {/* SlidingMenubar / SlidingCombobox / SlidingCommand / SlidingContextMenu / */}
          {/* SlidingDropdownMenu / SlidingScrollList / OverflowMenubar pominiete — */}
          {/* app-domain API (wymaga konfiguracji menu/akcji domenowych). */}
          Galeria debug — koniec.
        </footer>
      </main>
    </TooltipProvider>
  );
}
