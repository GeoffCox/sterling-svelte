# Roadmap

sterling-svelte is in alpha.
Anything and everything may change at any time.
There won't be a changelog until the library is 1.0.

The primary goal is to reach a component set that covers the practical aspects of building an application.
This will include components that have standards for behavior and accessibility.

## Components

| Component | Categories         | Introduced in Version |
| --------- | ------------------ | --------------------- |
| (theme)   | infrastructure     | 0.0.1                 |
| Button    | native, command    | 0.0.3                 |
| Input     | native, form       | 0.0.4                 |
| Checkbox  | native, form       | 0.0.5                 |
| Radio     | native, form       | 0.0.6                 |
| List      | container          | 0.0.7                 |
| Select    | form               | 0.0.7                 |
| Progress  | display            | 0.0.8                 |
| Slider    | form               | 0.0.8                 |
| Dialog    | surface            | 0.0.9                 |
| Label     | display, form      | 0.0.10                |
| Switch    | form               | 0.0.11                |
| TextArea  | form               | 0.0.13                |
| Tree      | container          | 0.0.14                |
| Tabs      | container, surface | 0.0.15                |
| Menus     | container, command | 0.0.16                |
| Tooltip   | display            | 0.0.17                |
| Field     | display, form      | 0.0.18                |

<br/>

### Categories

- command: clicking executes a command or action
- container: displays a set or hierarchy of other components
- display: displays read-only information
- form: typically used with form field input
- infrastructure: non-component code helpful to components
- native: renders a native HTML element
- surface: used to display sets of components on demand

## Under consideration

Lots of component libraries seem to collapse under their own weight over time.
While Svelt's tree-shaking compilation removes unused components, each component requires a commitment to consistency, upkeep, and integration.

There are many reasons a component may never be added to sterling-svelte even though it is popular in other component libraries.

- too many features or customizations
- low value (i.e. any developer could create it in 5 minutes)
- overly specialized
- barriers to accessibility, consistency, or performance
- requires proprietary dependencies (e.g. data sources, protocols, data formats)
- poor clone (i.e. another library has a gold-standard component)

### Command

- App Bar
- SplitButton
- Toolbar

### Containers

- Data Grid, Grid
- Table

### Display

- Alert, Notification, Toast
- Avatar, Persona
- Badge
- Chip / Pill
- Countdown, Clock, Stopwatch
- Divider
- Image
- Skeleton
- Spinner

### Form

- Calendar
- ChoiceGroup, RadioGroup, ToggleButton
- ColorPicker
- DatePicker
- Drawer / Panel
- Dropdown
- Rating
- Tags
- TimePicker
- Upload

### Navigation

- Breadcrumb
- Link, LinkButton
- Nav
- Pagination

### Surfaces

- Accordion
- Popover
- Split, Splitter
