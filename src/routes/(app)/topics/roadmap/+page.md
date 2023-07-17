# Roadmap

sterling-svelte is in alpha.
Anything and everything may change at any time.
There won't be a changelog until the library is 1.0.

The primary goal is to reach a component set that covers the practical aspects of building an application.
This will include components that have standards for behavior and accessibility.

## Components

| Component         | Categories     | HTML Element        | Introduced in Version |
| ----------------- | -------------- | ------------------- | --------------------- |
| (theme)           | infrastructure |                     | 0.0.1                 |
| Button            | command        | button              | 0.0.3                 |
| Input             | form           | input type=text     | 0.0.4                 |
| Checkbox          | form           | input type=checkbox | 0.0.5                 |
| Radio             | form           | input type=radio    | 0.0.6                 |
| List              | container      |                     | 0.0.7                 |
| ListItem          | container      |                     | 0.0.7                 |
| Select            | form           |                     | 0.0.7                 |
| Progress          | display        |                     | 0.0.8                 |
| Slider            | form           | input               | 0.0.8                 |
| Dialog            | surface        | dialog              | 0.0.9                 |
| Label             | form           | label               | 0.0.10                |
| Switch            | form           | input type=checkbox | 0.0.11                |
| TextArea          | form           | textarea            | 0.0.13                |
| Tree              | container      |                     | 0.0.14                |
| TreeChevron       | container      |                     | 0.0.14                |
| TreeItem          | container      |                     | 0.0.14                |
| TreeItemDisplay   | container      |                     | 0.0.14                |
| TabList           | container      |                     | 0.0.15                |
| Tab               | command        | button              | 0.0.15                |
| Menu              | command        |                     | 0.0.16                |
| MenuBar           | command        |                     | 0.0.16                |
| MenuButton        | command        | button              | 0.0.16                |
| MenuItem          | command        | button              | 0.0.16                |
| MenuItemDisplay   | command        |                     | 0.0.16                |
| MenuItemSeparator | command        |                     | 0.0.16                |
| Tooltip           | display        |                     | 0.0.17                |
| Field             | form           | label               | 0.0.18                |
| Dropdown          | form           |                     | 0.0.19                |
| Link              | navigation     | a                   | 0.0.20                |
| ColorPicker       | form           |                     | 0.0.27                |
| HexColorSliders   | form           |                     | 0.0.27                |
| HslColorSliders   | form           |                     | 0.0.27                |
| RgbColorSliders   | form           |                     | 0.0.27                |
| Label retired     | form           | label               | 0.0.28                |
| Field -> Label    | form           | label               | 0.0.28                |

<br/>

## Under consideration

Even if a component is popular in other libraries, it may not be added to sterling-svelte:

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
- DatePicker
- Drawer / Panel
- Rating
- Tags
- TimePicker
- Upload

### Navigation

- Breadcrumb
- Nav
- Pagination

### Surfaces

- Accordion
- Split, Splitter
