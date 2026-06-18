'use client'

import { useState, useRef, type ReactNode } from 'react'
import { format } from 'date-fns'
import { Bar, BarChart, XAxis } from 'recharts'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { useAppStore, neonGlow } from '@/stores/useAppStore'
import { ALL_ACCENT_PRESETS, CONTRAST_KEY } from '@/shared/lib/theme-presets'
import {
  AlertTriangle, Bell, Bold, Calendar as CalendarIcon, Check,
  ChevronRight, CircleDot, Copy, Download, Eye, FileText,
  GripVertical, Heart, Italic, LayoutGrid, Loader2, Menu, Moon,
  PanelLeftClose, Palette, Plus, Search, Settings, Star, Sun,
  Table2, Trash2, Type, Underline, User, Volume2, X, Zap,
} from 'lucide-react'

// ── UI components (alphabetical) ──
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui/lib/Accordion'
import { Alert, AlertTitle, AlertDescription } from '@/shared/ui/lib/Alert'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from '@/shared/ui/lib/AlertDialog'
import { AppIcon } from '@/shared/ui/lib/AppIcon'
import { AspectRatio } from '@/shared/ui/lib/AspectRatio'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/lib/Avatar'
import { Badge } from '@/shared/ui/lib/Badge'
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList,
  BreadcrumbPage, BreadcrumbSeparator,
} from '@/shared/ui/lib/Breadcrumb'
import { Button } from '@/shared/ui/Button/Button'
import { ButtonGroup } from '@/shared/ui/lib/ButtonGroup'
import { Calendar } from '@/shared/ui/lib/Calendar'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui/lib/Card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/shared/ui/lib/Carousel'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/shared/ui/lib/Chart'
import { Checkbox } from '@/shared/ui/lib/Checkbox'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/shared/ui/lib/Collapsible'
import { Combobox } from '@/shared/ui/lib/Combobox'
import { SlidingCombobox } from '@/shared/ui/lib/SlidingCombobox'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/shared/ui/lib/Command'
import {
  SlidingCommand,
  SlidingCommandEmpty,
  SlidingCommandGroup,
  SlidingCommandInput,
  SlidingCommandItem,
  SlidingCommandList,
  SlidingCommandSeparator,
  SlidingCommandShortcut,
} from '@/shared/ui/lib/SlidingCommand'
import {
  ContextMenu, ContextMenuContent, ContextMenuItem,
  ContextMenuSeparator, ContextMenuTrigger,
} from '@/shared/ui/lib/ContextMenu'
import {
  SlidingContextMenu,
  SlidingContextMenuContent,
  SlidingContextMenuItem,
  SlidingContextMenuSeparator,
  SlidingContextMenuTrigger,
} from '@/shared/ui/lib/SlidingContextMenu'
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger,
} from '@/shared/ui/lib/Dialog'
import {
  Drawer, DrawerClose, DrawerContent, DrawerDescription,
  DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger,
} from '@/shared/ui/lib/Drawer'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/shared/ui/lib/DropdownMenu'
import {
  SlidingDropdownMenu,
  SlidingDropdownMenuContent,
  SlidingDropdownMenuItem,
  SlidingDropdownMenuLabel,
  SlidingDropdownMenuSeparator,
  SlidingDropdownMenuTrigger,
} from '@/shared/ui/lib/SlidingDropdownMenu'
import { EmptyState } from '@/shared/ui/lib/EmptyState'
import { FormField } from '@/shared/ui/lib/FormField'
import {
  HoverCard, HoverCardContent, HoverCardTrigger,
} from '@/shared/ui/lib/HoverCard'
import { Input } from '@/shared/ui/lib/Input'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/shared/ui/lib/InputOtp'
import { Kbd, KbdCombo } from '@/shared/ui/lib/Kbd'
import { Label } from '@/shared/ui/lib/Label'
import { ListItem } from '@/shared/ui/lib/ListItem'
import { LoadingBar } from '@/shared/ui/lib/LoadingBar'
import {
  Menubar, MenubarContent, MenubarItem, MenubarMenu,
  MenubarSeparator, MenubarShortcut, MenubarTrigger,
} from '@/shared/ui/lib/Menubar'
import {
  NavigationMenu, NavigationMenuContent, NavigationMenuItem,
  NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/shared/ui/lib/NavigationMenu'
import { PageHeader } from '@/shared/ui/lib/PageHeader'
import {
  Pagination, PaginationContent, PaginationEllipsis, PaginationItem,
  PaginationLink, PaginationNext, PaginationPrevious,
} from '@/shared/ui/lib/Pagination'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/lib/Popover'
import { Progress } from '@/shared/ui/lib/Progress'
import { RadioGroup, RadioGroupItem } from '@/shared/ui/lib/RadioGroup'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/shared/ui/lib/Resizable'
import { ScrollArea } from '@/shared/ui/lib/ScrollArea'
import { SectionCard } from '@/shared/ui/lib/SectionCard'
import { SectionContent } from '@/shared/ui/lib/SectionContent'
import {
  SlidingMenubar,
  SlidingMenubarItems,
  type SlidingTriggerDef,
  type SlidingItemEntry,
} from '@/shared/ui/lib/SlidingMenubar'
import { SlidingNav, type SlidingNavItem } from '@/shared/ui/lib/SlidingNav'
import { SlidingScrollList } from '@/shared/ui/lib/SlidingScrollList'
import { SlidingSelect } from '@/shared/ui/lib/SlidingSelect'
import { Separator } from '@/shared/ui/lib/Separator'
import { SettingRow } from '@/shared/ui/lib/SettingRow'
import {
  Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger,
} from '@/shared/ui/lib/Sheet'
import { Skeleton } from '@/shared/ui/lib/Skeleton'
import { Slider } from '@/shared/ui/lib/Slider'
import { SliderRow } from '@/shared/ui/lib/SliderRow'
import { Spinner } from '@/shared/ui/lib/Spinner'
import { StatusCard } from '@/shared/ui/lib/StatusCard'
import { Switch } from '@/shared/ui/lib/Switch'
import {
  Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,
} from '@/shared/ui/lib/Table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/lib/Tabs'
import { SlidingTabs, SlidingTabsList, SlidingTabsTrigger, SlidingTabsContent } from '@/shared/ui/lib/SlidingTabs'
import { Textarea } from '@/shared/ui/lib/Textarea'
import { Toggle } from '@/shared/ui/lib/Toggle'
import { ToggleGroup, ToggleGroupItem } from '@/shared/ui/lib/ToggleGroup'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/lib/Tooltip'
import { Toaster } from '@/shared/ui/lib/Sonner'

// ── Types ──
import type { LucideIcon } from 'lucide-react'

interface ComponentEntry {
  id: string
  name: string
  icon: LucideIcon
  tags?: string
}

// ── Registry (alphabetical, 65 components) ──
const COMPONENTS: ComponentEntry[] = [
  { id: 'accordion', name: 'Accordion', icon: ChevronRight, tags: 'collapse expand' },
  { id: 'alert', name: 'Alert', icon: AlertTriangle, tags: 'warning info error' },
  { id: 'alert-dialog', name: 'AlertDialog', icon: AlertTriangle, tags: 'confirm modal' },
  { id: 'app-icon', name: 'AppIcon', icon: Star, tags: 'logo brand' },
  { id: 'aspect-ratio', name: 'AspectRatio', icon: CircleDot, tags: 'image ratio' },
  { id: 'avatar', name: 'Avatar', icon: User, tags: 'profile image' },
  { id: 'badge', name: 'Badge', icon: Star, tags: 'tag label chip' },
  { id: 'breadcrumb', name: 'Breadcrumb', icon: ChevronRight, tags: 'navigation path' },
  { id: 'button', name: 'Button', icon: Zap, tags: 'action click cta' },
  { id: 'button-group', name: 'ButtonGroup', icon: Zap, tags: 'group actions toolbar' },
  { id: 'calendar', name: 'Calendar', icon: CalendarIcon, tags: 'date picker' },
  { id: 'card', name: 'Card', icon: FileText, tags: 'container box panel' },
  { id: 'carousel', name: 'Carousel', icon: LayoutGrid, tags: 'slider slide gallery' },
  { id: 'chart', name: 'Chart', icon: Table2, tags: 'recharts graph bar' },
  { id: 'checkbox', name: 'Checkbox', icon: Check, tags: 'check toggle boolean' },
  { id: 'collapsible', name: 'Collapsible', icon: ChevronRight, tags: 'expand hide' },
  { id: 'combobox', name: 'Combobox', icon: Search, tags: 'select search autocomplete' },
  { id: 'command', name: 'Command', icon: Search, tags: 'palette search filter' },
  { id: 'context-menu', name: 'ContextMenu', icon: Menu, tags: 'right-click popup' },
  { id: 'sliding-context-menu', name: 'SlidingContextMenu', icon: Menu, tags: 'sliding pill right-click context menu custom' },
  { id: 'date-picker', name: 'DatePicker', icon: CalendarIcon, tags: 'date calendar popover' },
  { id: 'dialog', name: 'Dialog', icon: Eye, tags: 'modal popup overlay' },
  { id: 'drawer', name: 'Drawer', icon: PanelLeftClose, tags: 'bottom sheet slide' },
  { id: 'dropdown-menu', name: 'DropdownMenu', icon: Menu, tags: 'menu actions' },
  { id: 'sliding-dropdown-menu', name: 'SlidingDropdownMenu', icon: Menu, tags: 'sliding pill dropdown menu actions custom' },
  { id: 'sliding-command', name: 'SlidingCommand', icon: Menu, tags: 'sliding pill command palette cmdk custom' },
  { id: 'sliding-combobox', name: 'SlidingCombobox', icon: Menu, tags: 'sliding pill combobox searchable select custom' },
  { id: 'empty-state', name: 'EmptyState', icon: FileText, tags: 'placeholder no-data' },
  { id: 'form', name: 'Form', icon: FileText, tags: 'react-hook-form zod validation' },
  { id: 'form-field', name: 'FormField', icon: FileText, tags: 'input label wrapper' },
  { id: 'hover-card', name: 'HoverCard', icon: Eye, tags: 'preview popup' },
  { id: 'input', name: 'Input', icon: FileText, tags: 'text field' },
  { id: 'input-otp', name: 'InputOtp', icon: LayoutGrid, tags: 'code pin verification' },
  { id: 'kbd', name: 'Kbd', icon: Settings, tags: 'keyboard shortcut key' },
  { id: 'label', name: 'Label', icon: FileText, tags: 'text caption' },
  { id: 'list-item', name: 'ListItem', icon: LayoutGrid, tags: 'row entry selectable' },
  { id: 'loading-bar', name: 'LoadingBar', icon: Loader2, tags: 'progress indicator' },
  { id: 'menubar', name: 'Menubar', icon: Menu, tags: 'navigation menu bar' },
  { id: 'navigation-menu', name: 'NavigationMenu', icon: LayoutGrid, tags: 'nav links' },
  { id: 'neon-orbs', name: 'NeonOrbs', icon: Palette, tags: 'decoration background' },
  { id: 'page-header', name: 'PageHeader', icon: LayoutGrid, tags: 'title heading' },
  { id: 'pagination', name: 'Pagination', icon: LayoutGrid, tags: 'pages next prev' },
  { id: 'popover', name: 'Popover', icon: Eye, tags: 'popup tooltip' },
  { id: 'progress', name: 'Progress', icon: Loader2, tags: 'bar loading percent' },
  { id: 'radio-group', name: 'RadioGroup', icon: CircleDot, tags: 'option select' },
  { id: 'resizable', name: 'Resizable', icon: GripVertical, tags: 'panel drag split' },
  { id: 'scroll-area', name: 'ScrollArea', icon: LayoutGrid, tags: 'overflow scroll' },
  { id: 'section-card', name: 'SectionCard', icon: LayoutGrid, tags: 'container section glow' },
  { id: 'select', name: 'Select', icon: Eye, tags: 'dropdown choose option' },
  { id: 'separator', name: 'Separator', icon: LayoutGrid, tags: 'divider line hr' },
  { id: 'setting-row', name: 'SettingRow', icon: Settings, tags: 'switch toggle option' },
  { id: 'sheet', name: 'Sheet', icon: PanelLeftClose, tags: 'side panel drawer' },
  { id: 'skeleton', name: 'Skeleton', icon: Loader2, tags: 'loading placeholder' },
  { id: 'slider', name: 'Slider', icon: Settings, tags: 'range value' },
  { id: 'slider-row', name: 'SliderRow', icon: Settings, tags: 'slider label icon' },
  { id: 'sliding-menubar', name: 'SlidingMenubar', icon: Menu, tags: 'sliding pill menubar custom' },
  { id: 'sliding-nav', name: 'SlidingNav', icon: LayoutGrid, tags: 'sliding pill nav horizontal vertical custom' },
  { id: 'sliding-scroll-list', name: 'SlidingScrollList', icon: LayoutGrid, tags: 'sliding scroll list pill rounded fade' },
  { id: 'sonner', name: 'Sonner (Toast)', icon: Bell, tags: 'notification toast alert' },
  { id: 'spinner', name: 'Spinner', icon: Loader2, tags: 'loading animation' },
  { id: 'splash-screen', name: 'SplashScreen', icon: Star, tags: 'boot startup' },
  { id: 'status-card', name: 'StatusCard', icon: Zap, tags: 'indicator metric' },
  { id: 'switch', name: 'Switch', icon: Settings, tags: 'toggle on off' },
  { id: 'table', name: 'Table', icon: Table2, tags: 'data grid rows' },
  { id: 'tabs', name: 'Tabs', icon: LayoutGrid, tags: 'tab navigation panel' },
  { id: 'sliding-tabs', name: 'SlidingTabs', icon: LayoutGrid, tags: 'sliding pill hover tabs custom' },
  { id: 'textarea', name: 'Textarea', icon: FileText, tags: 'text multiline field' },
  { id: 'toggle', name: 'Toggle + ToggleGroup', icon: Bold, tags: 'toggle pressed group' },
  { id: 'tooltip', name: 'Tooltip', icon: Eye, tags: 'hover info hint' },
  { id: 'typography', name: 'Typography', icon: Type, tags: 'heading text paragraph muted lead' },
  // ── Theme customization ──
  { id: 'theme-colors', name: 'Kolory akcentu', icon: Palette, tags: 'theme accent color motyw' },
  { id: 'theme-radius', name: 'Zaokrąglenia', icon: Settings, tags: 'radius border rounded corners' },
  { id: 'theme-mode', name: 'Tryb ciemny/jasny', icon: Eye, tags: 'dark light mode theme' },
  { id: 'theme-fonts', name: 'Czcionki', icon: Type, tags: 'font typography family tekst' },
]

// ── Chart data ──
const chartConfig = {
  value: { label: 'Wartość', color: 'var(--accent)' },
} satisfies ChartConfig

const chartData = [
  { name: 'Sty', value: 186 }, { name: 'Lut', value: 305 },
  { name: 'Mar', value: 237 }, { name: 'Kwi', value: 73 },
  { name: 'Maj', value: 209 }, { name: 'Cze', value: 214 },
]

/* ═══════════════════════════════════════════════════════════════
   Component Gallery — Source of Truth
   65 komponentów. Sidebar + preview.
   Renderuje demo TYLKO wybranego komponentu.
   ═══════════════════════════════════════════════════════════════ */

export default function GalleryPage() {
  // ── State ──
  const [search, setSearch] = useState('')

  // Demo-specific state
  const [switchA, setSwitchA] = useState(true)
  const [switchB, setSwitchB] = useState(false)
  const [slider1, setSlider1] = useState([50])
  const [slider2, setSlider2] = useState([75])
  const [selectVal, setSelectVal] = useState('option-2')
  const [inputVal, setInputVal] = useState('')
  const [textareaVal, setTextareaVal] = useState('')
  const [progress, setProgress] = useState(65)
  const [collapsibleOpen, setCollapsibleOpen] = useState(false)
  const [loadingActive, setLoadingActive] = useState(false)
  const [selectedItem, setSelectedItem] = useState(1)
  const [checkboxA, setCheckboxA] = useState(true)
  const [checkboxB, setCheckboxB] = useState(false)
  const [radioVal, setRadioVal] = useState('option-1')
  const [comboVal, setComboVal] = useState('pl')
  const [calendarDate, setCalendarDate] = useState<Date | undefined>(new Date())
  const [toggleBold, setToggleBold] = useState(false)
  const [toggleValues, setToggleValues] = useState<string[]>(['bold'])

  // Theme store (reactive — for theme customization demos)
  const { accentColor, setAccentColor, neonLevel, theme, toggleTheme } = useAppStore()

  // ── Filter ──
  const query = search.toLowerCase()
  const filtered = COMPONENTS.filter((c) => {
    const hay = `${c.name} ${c.tags ?? ''}`.toLowerCase()
    return hay.includes(query)
  })

  // ── Demo renderer ──
  function renderDemo(id: string): ReactNode {
    switch (id) {
      // ─── A ───
      case 'accordion':
        return (
          <Accordion type="single" collapsible>
            <AccordionItem value="a1">
              <AccordionTrigger>Czym jest MangaShift?</AccordionTrigger>
              <AccordionContent>Aplikacja desktopowa do OCR, tłumaczeń i TTS — Tauri + React.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="a2">
              <AccordionTrigger>Jak działa OCR?</AccordionTrigger>
              <AccordionContent>Rozpoznawanie tekstu z ekranu za pomocą OneOCR.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="a3">
              <AccordionTrigger>Obsługiwane języki</AccordionTrigger>
              <AccordionContent>100+ języków tłumaczeń, 60+ głosów TTS.</AccordionContent>
            </AccordionItem>
          </Accordion>
        )

      case 'alert':
        return (
          <div className="space-y-3">
            <Alert>
              <AlertTitle>Informacja</AlertTitle>
              <AlertDescription>To jest domyślny alert z informacją.</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertTitle>Błąd!</AlertTitle>
              <AlertDescription>Coś poszło nie tak. Spróbuj ponownie.</AlertDescription>
            </Alert>
          </div>
        )

      case 'alert-dialog':
        return (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm"><Trash2 size={14} /> Usuń profil</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Czy na pewno chcesz usunąć?</AlertDialogTitle>
                <AlertDialogDescription>Ta operacja jest nieodwracalna.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Anuluj</AlertDialogCancel>
                <AlertDialogAction>Usuń</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )

      case 'app-icon':
        return (
          <div className="flex items-center gap-4">
            <AppIcon size={24} />
            <AppIcon size={32} />
            <AppIcon size={48} />
            <AppIcon size={64} />
          </div>
        )

      case 'aspect-ratio':
        return (
          <div className="flex gap-4">
            <div className="w-48">
              <Label className="text-xs text-muted-foreground mb-1 block">16:9</Label>
              <AspectRatio ratio={16 / 9} className="rounded-lg overflow-hidden border border-[var(--glass-border)]">
                <div className="flex h-full items-center justify-center bg-[var(--overlay)]">
                  <span className="text-sm text-muted-foreground">16:9</span>
                </div>
              </AspectRatio>
            </div>
            <div className="w-32">
              <Label className="text-xs text-muted-foreground mb-1 block">1:1</Label>
              <AspectRatio ratio={1} className="rounded-lg overflow-hidden border border-[var(--glass-border)]">
                <div className="flex h-full items-center justify-center bg-[var(--overlay)]">
                  <span className="text-sm text-muted-foreground">1:1</span>
                </div>
              </AspectRatio>
            </div>
          </div>
        )

      case 'avatar':
        return (
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <Avatar><AvatarFallback>MM</AvatarFallback></Avatar>
            <Avatar><AvatarFallback>ER</AvatarFallback></Avatar>
          </div>
        )

      // ─── B ───
      case 'badge':
        return (
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        )

      case 'button-group':
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-xs text-muted-foreground mb-2 block">Horizontal</Label>
              <ButtonGroup>
                <Button variant="outline" size="sm">Lewo</Button>
                <Button variant="outline" size="sm">Środek</Button>
                <Button variant="outline" size="sm">Prawo</Button>
              </ButtonGroup>
            </div>
            <Separator />
            <div>
              <Label className="text-xs text-muted-foreground mb-2 block">Vertical</Label>
              <ButtonGroup orientation="vertical">
                <Button variant="outline" size="sm">Góra</Button>
                <Button variant="outline" size="sm">Środek</Button>
                <Button variant="outline" size="sm">Dół</Button>
              </ButtonGroup>
            </div>
          </div>
        )

      case 'breadcrumb':
        return (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="#">Strona główna</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbLink href="#">Ustawienia</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>Wygląd</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        )

      case 'button':
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-xs text-muted-foreground mb-2 block">Warianty</Label>
              <div className="flex flex-wrap gap-2">
                <Button variant="default">Default</Button>
                <Button variant="accent">Accent</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>
            <Separator />
            <div>
              <Label className="text-xs text-muted-foreground mb-2 block">Rozmiary</Label>
              <div className="flex flex-wrap items-center gap-2">
                <Button size="lg"><Plus size={16} /> Large</Button>
                <Button>Default</Button>
                <Button size="sm">Small</Button>
                <Button size="xs">XS</Button>
              </div>
            </div>
            <Separator />
            <div>
              <Label className="text-xs text-muted-foreground mb-2 block">Ikony</Label>
              <div className="flex items-center gap-2">
                <Button size="icon-lg" variant="outline"><Heart /></Button>
                <Button size="icon" variant="accent"><Star /></Button>
                <Button size="icon-sm" variant="secondary"><Bell /></Button>
                <Button size="icon-xs" variant="ghost"><Settings /></Button>
              </div>
            </div>
            <Separator />
            <div>
              <Label className="text-xs text-muted-foreground mb-2 block">Z ikonami + Disabled</Label>
              <div className="flex flex-wrap gap-2">
                <Button variant="accent"><Download size={16} /> Pobierz</Button>
                <Button variant="outline"><Copy size={16} /> Kopiuj</Button>
                <Button variant="destructive"><Trash2 size={16} /> Usuń</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </div>
        )

      // ─── C ───
      case 'calendar':
        return (
          <Calendar
            mode="single"
            selected={calendarDate}
            onSelect={setCalendarDate}
            className="rounded-lg border border-[var(--glass-border)] bg-transparent"
          />
        )

      case 'card':
        return (
          <Card className="max-w-sm">
            <CardHeader>
              <CardTitle>Tytuł karty</CardTitle>
              <CardDescription>Opis karty — krótki summary.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Treść karty z dowolnymi komponentami.</p>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button variant="outline" size="sm">Anuluj</Button>
              <Button variant="accent" size="sm">Zapisz</Button>
            </CardFooter>
          </Card>
        )

      case 'carousel':
        return (
          <Carousel className="w-full max-w-xs mx-auto">
            <CarouselContent>
              {[1, 2, 3, 4, 5].map((i) => (
                <CarouselItem key={i}>
                  <div className="p-1">
                    <div className="flex h-32 items-center justify-center rounded-lg border border-[var(--glass-border)] bg-[var(--overlay)]">
                      <span className="text-2xl font-bold text-[var(--accent)]">{i}</span>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )

      case 'chart':
        return (
          <ChartContainer config={chartConfig} className="h-48 w-full">
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <Bar dataKey="value" fill="var(--color-value)" radius={4} />
              <ChartTooltip content={<ChartTooltipContent />} />
            </BarChart>
          </ChartContainer>
        )

      case 'checkbox':
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Checkbox id="g-cb-a" checked={checkboxA} onCheckedChange={(v) => setCheckboxA(v as boolean)} />
              <Label htmlFor="g-cb-a" className="text-sm">Zaznaczony</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="g-cb-b" checked={checkboxB} onCheckedChange={(v) => setCheckboxB(v as boolean)} />
              <Label htmlFor="g-cb-b" className="text-sm">Niezaznaczony</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox disabled checked />
              <Label className="text-sm text-muted-foreground">Disabled</Label>
            </div>
          </div>
        )

      case 'collapsible':
        return (
          <Collapsible open={collapsibleOpen} onOpenChange={setCollapsibleOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="sm">{collapsibleOpen ? 'Zwiń' : 'Rozwiń'}</Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="mt-2 rounded-lg border border-[var(--glass-border)] p-3 text-sm text-muted-foreground">
                Ukryta treść. Może zawierać dowolne komponenty.
              </div>
            </CollapsibleContent>
          </Collapsible>
        )

      case 'combobox':
        return (
          <Combobox
            options={[
              { value: 'pl', label: 'Polski' },
              { value: 'en', label: 'English' },
              { value: 'de', label: 'Deutsch' },
              { value: 'ja', label: '日本語' },
              { value: 'ko', label: '한국어' },
            ]}
            value={comboVal}
            onValueChange={setComboVal}
            placeholder="Wybierz język..."
            searchPlaceholder="Szukaj języka..."
          />
        )

      case 'sliding-combobox':
        return (
          <SlidingCombobox
            options={[
              { value: 'pl', label: 'Polski' },
              { value: 'en', label: 'English' },
              { value: 'de', label: 'Deutsch' },
              { value: 'ja', label: '日本語' },
              { value: 'ko', label: '한국어' },
              { value: 'fr', label: 'Français' },
              { value: 'es', label: 'Español' },
            ]}
            value={comboVal}
            onValueChange={setComboVal}
            placeholder="Wybierz język..."
            searchPlaceholder="Szukaj języka..."
          />
        )

      case 'command':
        return (
          <Command className="rounded-lg border border-[var(--glass-border)]">
            <CommandInput placeholder="Szukaj..." />
            <CommandList>
              <CommandEmpty>Brak wyników.</CommandEmpty>
              <CommandGroup heading="Sugestie">
                <CommandItem>Ustawienia</CommandItem>
                <CommandItem>Profil OCR</CommandItem>
                <CommandItem>Tłumaczenie</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        )

      case 'sliding-command':
        return (
          <SlidingCommand className="rounded-lg border border-[var(--glass-border)]">
            <SlidingCommandInput placeholder="Szukaj..." />
            <SlidingCommandList>
              <SlidingCommandEmpty>Brak wyników.</SlidingCommandEmpty>
              <SlidingCommandGroup heading="Sugestie">
                <SlidingCommandItem>Ustawienia</SlidingCommandItem>
                <SlidingCommandItem>Profil OCR</SlidingCommandItem>
                <SlidingCommandItem>Tłumaczenie</SlidingCommandItem>
                <SlidingCommandItem>Eksport PDF</SlidingCommandItem>
              </SlidingCommandGroup>
              <SlidingCommandSeparator />
              <SlidingCommandGroup heading="Narzędzia">
                <SlidingCommandItem>OCR <SlidingCommandShortcut>⌘O</SlidingCommandShortcut></SlidingCommandItem>
                <SlidingCommandItem>TTS <SlidingCommandShortcut>⌘T</SlidingCommandShortcut></SlidingCommandItem>
              </SlidingCommandGroup>
            </SlidingCommandList>
          </SlidingCommand>
        )

      case 'context-menu':
        return (
          <ContextMenu>
            <ContextMenuTrigger className="flex h-24 items-center justify-center rounded-lg border border-dashed border-[var(--glass-border)] text-sm text-muted-foreground">
              Kliknij prawym przyciskiem myszy
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem>Kopiuj</ContextMenuItem>
              <ContextMenuItem>Wklej</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem className="text-destructive">Usuń</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        )

      case 'sliding-context-menu':
        return (
          <SlidingContextMenu>
            <SlidingContextMenuTrigger className="flex h-24 items-center justify-center rounded-lg border border-dashed border-[var(--glass-border)] text-sm text-muted-foreground">
              Kliknij prawym przyciskiem myszy
            </SlidingContextMenuTrigger>
            <SlidingContextMenuContent>
              <SlidingContextMenuItem>Kopiuj</SlidingContextMenuItem>
              <SlidingContextMenuItem>Wklej</SlidingContextMenuItem>
              <SlidingContextMenuItem>Duplikuj</SlidingContextMenuItem>
              <SlidingContextMenuSeparator />
              <SlidingContextMenuItem className="text-destructive">Usuń</SlidingContextMenuItem>
            </SlidingContextMenuContent>
          </SlidingContextMenu>
        )

      // ─── D ───
      case 'date-picker':
        return (
          <Popover>
            <PopoverTrigger asChild>
              <button
                className={`inline-flex h-8 w-[240px] items-center justify-start gap-2 rounded-lg border border-[var(--btn-border)] bg-[var(--btn-bg)] px-3 text-sm font-normal transition-colors hover:bg-[var(--btn-hover)] ${!calendarDate ? 'text-muted-foreground' : 'text-foreground'}`}
              >
                <CalendarIcon className="size-4" />
                {calendarDate ? format(calendarDate, 'PPP') : 'Wybierz datę...'}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={calendarDate} onSelect={setCalendarDate} />
            </PopoverContent>
          </Popover>
        )

      case 'dialog':
        return (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Otwórz dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Przykładowy dialog</DialogTitle>
                <DialogDescription>Dialog z formularzem.</DialogDescription>
              </DialogHeader>
              <FormField label="Nazwa">
                <Input placeholder="Wpisz nazwę..." />
              </FormField>
              <DialogFooter>
                <Button variant="outline">Anuluj</Button>
                <Button variant="accent">Zapisz</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )

      case 'drawer':
        return (
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline" size="sm">Otwórz drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Drawer</DrawerTitle>
                <DrawerDescription>Panel wysuwany od dołu.</DrawerDescription>
              </DrawerHeader>
              <div className="p-4 text-sm text-muted-foreground">Treść drawera.</div>
              <DrawerFooter>
                <DrawerClose asChild><Button variant="outline">Zamknij</Button></DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        )

      case 'dropdown-menu':
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm"><Menu size={14} /> Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Akcje</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Edytuj</DropdownMenuItem>
              <DropdownMenuItem>Kopiuj</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Usuń</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )

      case 'sliding-dropdown-menu':
        return (
          <SlidingDropdownMenu>
            <SlidingDropdownMenuTrigger asChild>
              <Button variant="outline" size="sm"><Menu size={14} /> Sliding menu</Button>
            </SlidingDropdownMenuTrigger>
            <SlidingDropdownMenuContent>
              <SlidingDropdownMenuLabel>Akcje</SlidingDropdownMenuLabel>
              <SlidingDropdownMenuSeparator />
              <SlidingDropdownMenuItem>Edytuj</SlidingDropdownMenuItem>
              <SlidingDropdownMenuItem>Kopiuj</SlidingDropdownMenuItem>
              <SlidingDropdownMenuItem>Duplikuj</SlidingDropdownMenuItem>
              <SlidingDropdownMenuSeparator />
              <SlidingDropdownMenuItem className="text-destructive">Usuń</SlidingDropdownMenuItem>
            </SlidingDropdownMenuContent>
          </SlidingDropdownMenu>
        )

      // ─── E ───
      case 'empty-state':
        return (
          <div className="flex gap-4">
            <div className="flex-1"><EmptyState message="Brak danych" size="sm" /></div>
            <div className="flex-1"><EmptyState message="Lista pusta" size="md" /></div>
          </div>
        )

      // ─── F ───
      case 'form':
        return (
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">
              Integracja <code className="bg-muted px-1 py-0.5 rounded">react-hook-form</code> + <code className="bg-muted px-1 py-0.5 rounded">zod</code>.
            </p>
            <div className="space-y-2 rounded-lg border border-[var(--glass-border)] p-4">
              <FormField label="Imię">
                <Input placeholder="Jan" />
              </FormField>
              <FormField label="Email">
                <Input type="email" placeholder="jan@example.com" />
              </FormField>
              <Button variant="accent" size="sm" className="mt-2">Wyślij</Button>
            </div>
          </div>
        )

      case 'form-field':
        return (
          <div className="space-y-3">
            <FormField label="Email" icon={Search}>
              <Input placeholder="email@example.com" />
            </FormField>
            <FormField label="Opis">
              <Textarea placeholder="Krótki opis..." rows={2} />
            </FormField>
          </div>
        )

      // ─── H ───
      case 'hover-card':
        return (
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="link">@mangashift</Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-64">
              <div className="flex gap-3">
                <Avatar><AvatarFallback>ER</AvatarFallback></Avatar>
                <div>
                  <p className="text-sm font-medium">MangaShift</p>
                  <p className="text-xs text-muted-foreground">OCR • TTS • Tłumaczenia</p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        )

      // ─── I ───
      case 'input':
        return (
          <div className="space-y-2">
            <Input placeholder="Wpisz tekst..." value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
            <Input placeholder="Disabled" disabled value="Stała wartość" />
          </div>
        )

      case 'input-otp':
        return (
          <InputOTP maxLength={6}>
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
        )

      // ─── K ───
      case 'kbd':
        return (
          <div className="flex flex-wrap items-center gap-3">
            <KbdCombo keys={['Ctrl', 'S']} />
            <KbdCombo keys={['Ctrl', 'Shift', 'P']} />
            <Kbd>Esc</Kbd>
            <Kbd>Enter</Kbd>
            <Kbd>Tab</Kbd>
          </div>
        )

      // ─── L ───
      case 'label':
        return (
          <div className="space-y-2">
            <Label>Domyślna etykieta</Label>
            <Label className="text-muted-foreground">Wyciszona</Label>
            <Label className="text-xs text-[var(--accent)]">Akcentowa</Label>
          </div>
        )

      case 'list-item':
        return (
          <div className="space-y-1">
            <ListItem title="Z Switch" subtitle="Opis" switchProps={{ checked: switchA, onCheckedChange: setSwitchA }} />
            <ListItem title="Zaznaczalny" subtitle="Kliknij" selectable selected={selectedItem === 1} onClick={() => setSelectedItem(1)} badge="Aktywny" />
            <ListItem title="Z akcją" subtitle="Usuwanie" selectable selected={selectedItem === 2} onClick={() => setSelectedItem(2)} onDelete={() => {}} actionIcon={Copy} onAction={() => {}} />
          </div>
        )

      case 'loading-bar':
        return (
          <div className="space-y-2">
            <Button size="xs" variant="outline" onClick={() => { setLoadingActive(true); setTimeout(() => setLoadingActive(false), 3000) }}>
              Start (3s)
            </Button>
            <LoadingBar active={loadingActive} />
          </div>
        )

      // ─── M ───
      case 'menubar':
        return (
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>Plik</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Nowy <MenubarShortcut>Ctrl+N</MenubarShortcut></MenubarItem>
                <MenubarItem>Otwórz <MenubarShortcut>Ctrl+O</MenubarShortcut></MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Zapisz <MenubarShortcut>Ctrl+S</MenubarShortcut></MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Edycja</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Cofnij <MenubarShortcut>Ctrl+Z</MenubarShortcut></MenubarItem>
                <MenubarItem>Ponów <MenubarShortcut>Ctrl+Y</MenubarShortcut></MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        )

      // ─── N ───
      case 'navigation-menu':
        return (
          <div className="pb-14">
            <NavigationMenu viewport={false}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Dokumentacja</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="p-4 w-48">
                      <p className="text-sm font-medium">Quick links</p>
                      <p className="text-xs text-muted-foreground mt-1">Przewodniki i API reference.</p>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Changelog</NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        )

      case 'neon-orbs':
        return (
          <div className="relative h-32 rounded-lg border border-[var(--section-card-border-nested)] overflow-hidden bg-[var(--section-card-bg-nested)]">
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
              <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full opacity-30 blur-[40px]" style={{ background: 'var(--accent)' }} />
              <div className="absolute -bottom-8 -right-8 h-28 w-28 rounded-full opacity-25 blur-[35px]" style={{ background: 'var(--accent-bright)' }} />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs text-muted-foreground glass px-3 py-1.5 rounded-lg">Dekoracyjne kule neonowe — kolor z akcentu</span>
            </div>
          </div>
        )

      // ─── P ───
      case 'page-header':
        return (
          <div className="space-y-3">
            <PageHeader icon={Star} title="Przykładowy nagłówek" description="Z opisem i ikoną" />
            <Separator />
            <PageHeader icon={Zap} title="Bez opisu" />
          </div>
        )

      case 'pagination':
        return (
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
        )

      case 'popover':
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">Popover</Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <p className="text-sm text-muted-foreground">Treść popover.</p>
            </PopoverContent>
          </Popover>
        )

      case 'progress':
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">{progress}%</Label>
              <div className="flex gap-1">
                <Button size="xs" variant="outline" onClick={() => setProgress(Math.max(0, progress - 10))}>-10</Button>
                <Button size="xs" variant="outline" onClick={() => setProgress(Math.min(100, progress + 10))}>+10</Button>
              </div>
            </div>
            <Progress value={progress} />
          </div>
        )

      // ─── R ───
      case 'radio-group':
        return (
          <RadioGroup value={radioVal} onValueChange={setRadioVal}>
            <div className="flex items-center gap-2"><RadioGroupItem value="option-1" id="g-r1" /><Label htmlFor="g-r1" className="text-sm">Opcja 1</Label></div>
            <div className="flex items-center gap-2"><RadioGroupItem value="option-2" id="g-r2" /><Label htmlFor="g-r2" className="text-sm">Opcja 2</Label></div>
            <div className="flex items-center gap-2"><RadioGroupItem value="option-3" id="g-r3" /><Label htmlFor="g-r3" className="text-sm">Opcja 3</Label></div>
          </RadioGroup>
        )

      case 'resizable':
        return (
          <div className="rounded-lg border border-[var(--glass-border)] overflow-hidden">
            <ResizablePanelGroup className="min-h-[120px]">
              <ResizablePanel defaultSize={50} minSize={20}>
                <div className="flex h-full items-center justify-center p-4"><span className="text-sm text-muted-foreground">Lewy</span></div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={50} minSize={20}>
                <div className="flex h-full items-center justify-center p-4"><span className="text-sm text-muted-foreground">Prawy</span></div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        )

      // ─── S ───
      case 'scroll-area':
        return (
          <ScrollArea className="h-48 rounded-lg border border-[var(--glass-border)] p-3">
            <div className="space-y-2">
              {Array.from({ length: 20 }, (_, i) => (
                <div key={i} className="rounded-md bg-[var(--overlay)] px-3 py-2 text-sm text-muted-foreground">Element {i + 1}</div>
              ))}
            </div>
          </ScrollArea>
        )

      case 'section-card':
        return (
          <div className="space-y-3">
            <SectionCard icon={Star} title="Z akcentem i glow" accentLine glow>
              <SectionContent spacing="tight">
                <p className="text-sm text-muted-foreground">accentLine + glow</p>
              </SectionContent>
            </SectionCard>
            <SectionCard title="Bez ikony, bez akcentu" accentLine={false} glow={false}>
              <SectionContent spacing="tight">
                <p className="text-sm text-muted-foreground">accentLine=false, glow=false</p>
              </SectionContent>
            </SectionCard>
          </div>
        )

      case 'select':
        return (
          <SlidingSelect
            value={selectVal}
            onValueChange={setSelectVal}
            placeholder="Wybierz..."
            ariaLabel="Demo select"
            triggerClassName="w-[200px]"
            items={[
              { value: 'option-1', label: 'Opcja 1' },
              { value: 'option-2', label: 'Opcja 2' },
              { value: 'option-3', label: 'Opcja 3' },
            ]}
          />
        )

      case 'separator':
        return (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Powyżej</p>
            <Separator />
            <p className="text-sm text-muted-foreground">Poniżej</p>
            <div className="flex items-center gap-3 h-6">
              <span className="text-sm">Lewa</span>
              <Separator orientation="vertical" />
              <span className="text-sm">Prawa</span>
            </div>
          </div>
        )

      case 'setting-row':
        return (
          <div className="space-y-1">
            <SettingRow label="Autozapis" icon={Settings} description="Zapisuje po zmianie" checked={switchA} onCheckedChange={setSwitchA} />
            <SettingRow label="Powiadomienia" icon={Bell} checked={switchB} onCheckedChange={setSwitchB} />
          </div>
        )

      case 'sheet':
        return (
          <div className="flex gap-2">
            <Sheet>
              <SheetTrigger asChild><Button variant="outline" size="sm"><PanelLeftClose size={14} /> Prawy</Button></SheetTrigger>
              <SheetContent side="right">
                <SheetHeader><SheetTitle>Panel prawy</SheetTitle><SheetDescription>Glass morphism sheet.</SheetDescription></SheetHeader>
              </SheetContent>
            </Sheet>
            <Sheet>
              <SheetTrigger asChild><Button variant="outline" size="sm">Lewy</Button></SheetTrigger>
              <SheetContent side="left">
                <SheetHeader><SheetTitle>Panel lewy</SheetTitle></SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        )

      case 'skeleton':
        return (
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-1.5 flex-1">
                <Skeleton className="h-3 w-1/3" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
          </div>
        )

      case 'slider':
        return (
          <div className="flex items-center gap-3">
            <Label className="text-sm w-16">Val: {slider1[0]}</Label>
            <Slider value={slider1} onValueChange={setSlider1} min={0} max={100} step={1} />
          </div>
        )

      case 'slider-row':
        return (
          <div className="space-y-1">
            <SliderRow label="Głośność" icon={Volume2} value={slider1[0]} onValueChange={(v) => setSlider1([v])} min={0} max={100} step={1} formatValue={(v) => `${v}%`} />
            <SliderRow label="Prędkość" icon={Zap} value={slider2[0]} onValueChange={(v) => setSlider2([v])} min={0} max={100} step={5} formatValue={(v) => `${v / 100}×`} />
          </div>
        )

      case 'sliding-menubar': {
        const fileEntries: SlidingItemEntry[] = [
          { kind: 'item', label: 'Nowy', shortcut: 'Ctrl+N', onSelect: () => toast('Nowy') },
          { kind: 'item', label: 'Otwórz', shortcut: 'Ctrl+O', onSelect: () => toast('Otwórz') },
          { kind: 'separator' },
          { kind: 'item', label: 'Zapisz', shortcut: 'Ctrl+S', onSelect: () => toast('Zapisz') },
        ]
        const editEntries: SlidingItemEntry[] = [
          { kind: 'item', label: 'Cofnij', shortcut: 'Ctrl+Z', onSelect: () => toast('Cofnij') },
          { kind: 'item', label: 'Ponów', shortcut: 'Ctrl+Y', onSelect: () => toast('Ponów') },
        ]
        const viewEntries: SlidingItemEntry[] = [
          { kind: 'item', label: 'Powiększ', shortcut: 'Ctrl++', onSelect: () => toast('Powiększ') },
          { kind: 'item', label: 'Pomniejsz', shortcut: 'Ctrl+-', onSelect: () => toast('Pomniejsz') },
          { kind: 'separator' },
          { kind: 'item', label: 'Reset zoomu', onSelect: () => toast('Reset') },
        ]
        const triggers: SlidingTriggerDef[] = [
          { value: 'file', label: 'Plik', content: <MenubarContent><SlidingMenubarItems entries={fileEntries} /></MenubarContent> },
          { value: 'edit', label: 'Edycja', content: <MenubarContent><SlidingMenubarItems entries={editEntries} /></MenubarContent> },
          { value: 'view', label: 'Widok', content: <MenubarContent><SlidingMenubarItems entries={viewEntries} /></MenubarContent> },
        ]
        return <SlidingMenubar triggers={triggers} />
      }

      case 'sliding-nav': {
        const navItems: SlidingNavItem[] = [
          { key: 'home', content: 'Home' },
          { key: 'docs', content: 'Docs' },
          { key: 'about', content: 'About' },
          { key: 'pricing', content: 'Pricing' },
        ]
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-xs text-muted-foreground mb-2 block">Horizontal</Label>
              <SlidingNav items={navItems} activeKey={selectVal === '' ? 'home' : selectVal} onSelect={setSelectVal} orientation="horizontal" containerClassName="gap-1" />
            </div>
            <Separator />
            <div>
              <Label className="text-xs text-muted-foreground mb-2 block">Vertical (with accent bar)</Label>
              <SlidingNav
                items={navItems}
                activeKey={selectVal === '' ? 'home' : selectVal}
                onSelect={setSelectVal}
                orientation="vertical"
                accentBar
                containerClassName="gap-0.5 w-40"
                itemClassName="px-3 py-1.5 text-xs text-left text-muted-foreground hover:text-foreground"
              />
            </div>
          </div>
        )
      }

      case 'sliding-scroll-list':
        return (
          <div className="flex h-64">
            <SlidingScrollList>
              <ul className="flex flex-col gap-1 p-1">
                {Array.from({ length: 12 }).map((_, i) => (
                  <li key={i}>
                    <button
                      type="button"
                      data-sliding-item
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <span>Item {i + 1}</span>
                      <span className="text-xs text-muted-foreground">#{i + 1}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </SlidingScrollList>
          </div>
        )

      case 'sonner':
        return (
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={() => toast('Default')}>Default</Button>
            <Button size="sm" variant="outline" onClick={() => toast.success('Sukces!')}>Success</Button>
            <Button size="sm" variant="outline" onClick={() => toast.error('Błąd!')}>Error</Button>
            <Button size="sm" variant="outline" onClick={() => toast.warning('Uwaga!')}>Warning</Button>
            <Button size="sm" variant="outline" onClick={() => toast.info('Info')}>Info</Button>
            <Button size="sm" variant="outline" onClick={() => toast.loading('Ładowanie...')}>Loading</Button>
            <Button size="sm" variant="outline" onClick={() => toast('Akcja', { action: { label: 'Cofnij', onClick: () => toast.success('OK!') } })}>Z akcją</Button>
          </div>
        )

      case 'spinner':
        return (
          <div className="flex items-center gap-4">
            <Spinner size="xs" className="text-muted-foreground" />
            <Spinner size="sm" className="text-muted-foreground" />
            <Spinner className="text-[var(--accent)]" />
            <Spinner size="lg" className="text-[var(--accent-bright)]" />
            <Spinner size="xl" className="text-[var(--accent)]" />
          </div>
        )

      case 'splash-screen':
        return (
          <div className="relative h-40 rounded-lg border border-[var(--section-card-border-nested)] overflow-hidden bg-[var(--section-card-bg-nested)] flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <AppIcon size={48} />
              <Spinner size="sm" className="text-[var(--accent)]" />
              <span className="text-xs text-muted-foreground">Ładowanie aplikacji...</span>
            </div>
          </div>
        )

      case 'status-card':
        return (
          <div className="flex flex-wrap gap-3">
            <StatusCard icon={Zap} label="OCR" value="Aktywny" active />
            <StatusCard icon={Volume2} label="TTS" value="Gotowy" />
            <StatusCard icon={Eye} label="Region" value="1920×1080" />
          </div>
        )

      case 'switch':
        return (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2"><Switch checked={switchA} onCheckedChange={setSwitchA} /><Label className="text-sm">On</Label></div>
            <div className="flex items-center gap-2"><Switch checked={switchB} onCheckedChange={setSwitchB} /><Label className="text-sm">Off</Label></div>
            <div className="flex items-center gap-2"><Switch disabled checked /><Label className="text-sm text-muted-foreground">Disabled</Label></div>
          </div>
        )

      // ─── T ───
      case 'table':
        return (
          <Table>
            <TableCaption>Operacje OCR</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Nr</TableHead>
                <TableHead>Język</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Czas</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow><TableCell>1</TableCell><TableCell>Polski</TableCell><TableCell><Badge>OK</Badge></TableCell><TableCell className="text-right">234ms</TableCell></TableRow>
              <TableRow><TableCell>2</TableCell><TableCell>Angielski</TableCell><TableCell><Badge>OK</Badge></TableCell><TableCell className="text-right">187ms</TableCell></TableRow>
              <TableRow><TableCell>3</TableCell><TableCell>Japoński</TableCell><TableCell><Badge variant="destructive">Błąd</Badge></TableCell><TableCell className="text-right">—</TableCell></TableRow>
            </TableBody>
          </Table>
        )

      case 'tabs':
        return (
          <div className="space-y-4">
            <Tabs defaultValue="t1">
              <TabsList>
                <TabsTrigger value="t1">Zakładka 1</TabsTrigger>
                <TabsTrigger value="t2">Zakładka 2</TabsTrigger>
              </TabsList>
              <TabsContent value="t1" className="p-3 text-sm text-muted-foreground">Treść 1</TabsContent>
              <TabsContent value="t2" className="p-3 text-sm text-muted-foreground">Treść 2</TabsContent>
            </Tabs>
            <Separator />
            <Tabs defaultValue="l1">
              <TabsList variant="line">
                <TabsTrigger value="l1">Line A</TabsTrigger>
                <TabsTrigger value="l2">Line B</TabsTrigger>
              </TabsList>
              <TabsContent value="l1" className="p-3 text-sm text-muted-foreground">Wariant line</TabsContent>
              <TabsContent value="l2" className="p-3 text-sm text-muted-foreground">Opcja B</TabsContent>
            </Tabs>
          </div>
        )

      case 'sliding-tabs':
        return (
          <div className="space-y-4">
            <SlidingTabs defaultValue="t1">
              <SlidingTabsList>
                <SlidingTabsTrigger value="t1">Zakładka 1</SlidingTabsTrigger>
                <SlidingTabsTrigger value="t2">Zakładka 2</SlidingTabsTrigger>
                <SlidingTabsTrigger value="t3">Zakładka 3</SlidingTabsTrigger>
              </SlidingTabsList>
              <SlidingTabsContent value="t1" className="p-3 text-sm text-muted-foreground">Treść 1 — hover pill (akcent subtle) goni za kursorem, active indicator zostaje pod aktywnym tabem.</SlidingTabsContent>
              <SlidingTabsContent value="t2" className="p-3 text-sm text-muted-foreground">Treść 2</SlidingTabsContent>
              <SlidingTabsContent value="t3" className="p-3 text-sm text-muted-foreground">Treść 3</SlidingTabsContent>
            </SlidingTabs>
            <Separator />
            <SlidingTabs defaultValue="l1">
              <SlidingTabsList variant="line">
                <SlidingTabsTrigger value="l1">Line A</SlidingTabsTrigger>
                <SlidingTabsTrigger value="l2">Line B</SlidingTabsTrigger>
                <SlidingTabsTrigger value="l3">Line C</SlidingTabsTrigger>
              </SlidingTabsList>
              <SlidingTabsContent value="l1" className="p-3 text-sm text-muted-foreground">Wariant line</SlidingTabsContent>
              <SlidingTabsContent value="l2" className="p-3 text-sm text-muted-foreground">Opcja B</SlidingTabsContent>
              <SlidingTabsContent value="l3" className="p-3 text-sm text-muted-foreground">Opcja C</SlidingTabsContent>
            </SlidingTabs>
          </div>
        )

      case 'textarea':
        return <Textarea placeholder="Wieloliniowy tekst..." value={textareaVal} onChange={(e) => setTextareaVal(e.target.value)} rows={3} />

      case 'toggle':
        return (
          <div className="space-y-3">
            <div>
              <Label className="text-xs text-muted-foreground mb-2 block">Toggle (single)</Label>
              <Toggle aria-label="Bold" pressed={toggleBold} onPressedChange={setToggleBold}><Bold className="size-4" /></Toggle>
            </div>
            <Separator />
            <div>
              <Label className="text-xs text-muted-foreground mb-2 block">ToggleGroup (multi)</Label>
              <ToggleGroup type="multiple" value={toggleValues} onValueChange={setToggleValues}>
                <ToggleGroupItem value="bold" aria-label="Bold"><Bold className="size-4" /></ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Italic"><Italic className="size-4" /></ToggleGroupItem>
                <ToggleGroupItem value="underline" aria-label="Underline"><Underline className="size-4" /></ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        )

      case 'tooltip':
        return (
          <div className="flex gap-3">
            <Tooltip>
              <TooltipTrigger asChild><Button variant="outline" size="sm">Hover me</Button></TooltipTrigger>
              <TooltipContent>Domyślny tooltip</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild><Button variant="ghost" size="icon-sm"><Star /></Button></TooltipTrigger>
              <TooltipContent side="bottom">Na dole</TooltipContent>
            </Tooltip>
          </div>
        )

      case 'typography':
        return (
          <div className="space-y-4">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">Heading 1</h1>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">Heading 2</h2>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Heading 3</h3>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Heading 4</h4>
            <p className="leading-7">Paragraf z normalnym tekstem. <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">inline code</code></p>
            <p className="text-xl text-muted-foreground">Lead — większy tekst wprowadzający.</p>
            <blockquote className="border-l-2 pl-6 italic">&ldquo;Cytat blokowy z border-left.&rdquo;</blockquote>
            <p className="text-sm text-muted-foreground">Muted — wyciszony tekst pomocniczy.</p>
            <small className="text-sm leading-none font-medium">Small — drobny napis</small>
          </div>
        )

      // ─── Theme customization ───
      case 'theme-colors': {
        return (
          <div className="space-y-3">
            <Label className="text-xs text-muted-foreground block">Kolor akcentu — kliknij by zmienić</Label>
            <div className="flex flex-wrap gap-1.5">
              {ALL_ACCENT_PRESETS.map((color) => {
                const isActive = accentColor === color.key
                const isContrast = color.key === CONTRAST_KEY
                const dotColor = isContrast
                  ? theme === 'dark'
                    ? 'oklch(96.5% 0 0)'
                    : 'oklch(23% 0 0)'
                  : color.main
                const dotGlow = isContrast
                  ? theme === 'dark'
                    ? 'rgba(255,255,255,0.3)'
                    : 'rgba(0,0,0,0.2)'
                  : color.glow
                return (
                  <button
                    key={color.key}
                    onClick={() => setAccentColor(color.key)}
                    className={cn(
                      'group relative flex items-center gap-1.5 rounded-full px-2.5 py-1',
                      'border transition-[background,border-color,box-shadow,color] duration-[var(--motion-base)]',
                      'text-xs font-medium btn-press',
                      isActive
                        ? 'text-foreground hover:brightness-110'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                    style={
                      isActive
                        ? {
                            background: isContrast ? (theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)') : color.subtle,
                            borderColor: dotGlow,
                            boxShadow: neonGlow(neonLevel, dotGlow),
                          }
                        : {
                            background: 'var(--btn-bg)',
                            borderColor: 'var(--btn-border)',
                          }
                    }
                    aria-label={`Kolor akcentu: ${color.label}`}
                    aria-pressed={isActive}
                  >
                    <span
                      className="h-3 w-3 rounded-full shrink-0 transition-transform duration-[var(--motion-base)]"
                      style={{
                        background: dotColor,
                        boxShadow: isActive
                          ? neonLevel !== 'off'
                            ? `0 0 8px ${dotGlow}`
                            : `0 0 3px ${dotGlow}`
                          : `0 0 2px ${dotGlow}`,
                        transform: isActive ? 'scale(1.15)' : undefined,
                      }}
                    />
                    <span>{color.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )
      }

      case 'theme-mode': {
        return (
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 rounded-lg border border-[var(--glass-border)] px-4 py-2.5 text-sm font-medium transition-all hover:bg-[var(--overlay)] btn-press"
              style={{ background: 'var(--btn-bg)', borderColor: 'var(--btn-border)' }}
            >
              {theme === 'dark' ? (
                <><Moon className="size-4" /><span>Ciemny</span></>
              ) : (
                <><Sun className="size-4" /><span>Jasny</span></>
              )}
            </button>
            <span className="text-xs text-muted-foreground">Kliknij by przełączyć motyw</span>
          </div>
        )
      }

      case 'theme-radius':
        return (
          <div className="space-y-3">
            <Label className="text-xs text-muted-foreground block">Porównanie zaokrągleń</Label>
            <div className="flex flex-wrap gap-3">
              {[
                { label: '0', r: 'rounded-none' },
                { label: '0.3', r: 'rounded-sm' },
                { label: '0.5', r: 'rounded-md' },
                { label: '0.75', r: 'rounded-lg' },
                { label: '1.0', r: 'rounded-xl' },
              ].map(({ label, r }) => (
                <div key={label} className="flex flex-col items-center gap-1.5">
                  <div className={`h-16 w-16 border-2 border-[var(--accent)] bg-[var(--accent-subtle)] ${r}`} />
                  <span className="text-[10px] text-muted-foreground">{label}rem</span>
                </div>
              ))}
            </div>
          </div>
        )

      case 'theme-fonts':
        return (
          <div className="space-y-4">
            <Label className="text-xs text-muted-foreground block">Porównanie czcionek</Label>
            <div className="grid gap-3">
              {[
                { name: 'Inter', family: "'Inter', sans-serif" },
                { name: 'System UI', family: 'system-ui, sans-serif' },
                { name: 'Segoe UI', family: "'Segoe UI Variable', 'Segoe UI', sans-serif" },
                { name: 'Monospace', family: "'JetBrains Mono', 'Cascadia Code', 'Fira Code', monospace" },
                { name: 'Serif', family: "'Georgia', 'Times New Roman', serif" },
              ].map(({ name, family }) => (
                <div
                  key={name}
                  className="flex items-center justify-between rounded-lg border border-[var(--glass-border)] px-4 py-3"
                >
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">{name}</p>
                    <p className="text-sm" style={{ fontFamily: family }}>
                      Szybki brązowy lis przeskoczył nad leniwym psem — 0123456789
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      default:
        return <p className="text-sm text-muted-foreground">Demo niedostępne.</p>
    }
  }

  // ── Active components (multi-select) ──
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const toggleSelected = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const selectAll = () => {
    setSelectedIds(new Set(filtered.map((c) => c.id)))
  }

  const clearAll = () => {
    setSelectedIds(new Set())
  }

  // ── Scroll to demo when selecting ──
  const previewRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const selectedComps = COMPONENTS.filter((c) => selectedIds.has(c.id))

  return (
    <TooltipProvider>
      <div className="flex h-[calc(100vh-3rem)] gap-4">
        {/* ── Left sidebar — scrollable component list ── */}
        <SectionCard
          icon={LayoutGrid}
          title="Komponenty"
          description={`${selectedIds.size}/${COMPONENTS.length}`}
          className="w-64 shrink-0 flex flex-col overflow-hidden"
          accentLine
          glow={false}
        >
          {/* Search */}
          <div className="border-t border-[var(--border)] px-4 pb-3 pt-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <Input
                placeholder="Szukaj..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-8 pl-8 text-xs"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>
            {/* Select all / Clear */}
            <div className="mt-2 flex items-center justify-between">
              <div className="flex gap-1.5">
                <button
                  onClick={selectAll}
                  className="text-[10px] text-muted-foreground hover:text-[var(--accent-bright)] transition-colors"
                >
                  Wszystkie
                </button>
                <span className="text-[10px] text-muted-foreground">·</span>
                <button
                  onClick={clearAll}
                  className="text-[10px] text-muted-foreground hover:text-[var(--accent-bright)] transition-colors"
                >
                  Wyczyść
                </button>
              </div>
            </div>
          </div>

          {/* Scrollable list */}
          <ScrollArea className="min-h-0 flex-1">
            <div className="space-y-0.5 p-1.5 pr-3">
              {filtered.map((c) => {
                const Icon = c.icon
                const isSelected = selectedIds.has(c.id)
                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      toggleSelected(c.id)
                      // Scroll to the demo after a short delay (for DOM to render)
                      if (!selectedIds.has(c.id)) {
                        setTimeout(() => {
                          previewRefs.current[c.id]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
                        }, 50)
                      }
                    }}
                    className={`
                      flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs font-medium
                      transition-all duration-[var(--motion-base)]
                      ${isSelected
                        ? 'bg-[var(--accent-subtle)] text-[var(--accent-bright)] shadow-[inset_0_0_0_1px_var(--accent)]'
                        : 'text-muted-foreground hover:bg-[var(--overlay-hover)] hover:text-foreground'
                      }
                    `}
                  >
                    <span
                      aria-hidden
                      className={`inline-flex size-3.5 shrink-0 items-center justify-center rounded-[4px] border ${isSelected ? 'border-[var(--accent)] bg-[var(--accent)]' : 'border-[var(--btn-border)]'}`}
                    >
                      {isSelected && <Check className="size-3 text-white" />}
                    </span>
                    <Icon className="size-3.5 shrink-0" />
                    <span className="truncate">{c.name}</span>
                  </button>
                )
              })}
              {filtered.length === 0 && (
                <div className="px-2 py-4 text-center text-xs text-muted-foreground">
                  Brak wyników dla &ldquo;{search}&rdquo;
                </div>
              )}
            </div>
          </ScrollArea>
        </SectionCard>

        {/* ── Right preview area ── */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-4">
              {selectedComps.length === 0 ? (
                <EmptyState
                  message="Wybierz komponenty z listy po lewej"
                  size="sm"
                />
              ) : (
                selectedComps.map((comp) => (
                  <div
                    key={comp.id}
                    ref={(el) => { previewRefs.current[comp.id] = el }}
                  >
                    <SectionCard
                      icon={comp.icon}
                      title={comp.name}
                      className={comp.id === 'navigation-menu' ? 'overflow-visible' : undefined}
                    >
                      <SectionContent spacing="normal">
                        {renderDemo(comp.id)}
                      </SectionContent>
                    </SectionCard>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
      <Toaster />
    </TooltipProvider>
  )
}
