# PAV - Pathfinding Algorithm Visualizer

A beautiful, interactive web application for visualizing pathfinding algorithms. Watch algorithms like Dijkstra's, A*, BFS, and DFS find the shortest path between two points on a customizable grid.

![PAV](https://img.shields.io/badge/PAV-Pathfinding%20Visualizer-blue)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![License](https://img.shields.io/badge/license-MIT-green)

## 🌟 Features

- **Multiple Algorithms**: Visualize Dijkstra's, A*, BFS, and DFS algorithms
- **Interactive Grid**: Click and drag to create walls, or use maze generators
- **Draggable Nodes**: Move start and end nodes anywhere on the grid
- **Speed Control**: Adjust animation speed (Fast, Average, Slow)
- **Maze Generation**: Generate random or recursive division mazes
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Beautiful frosted glass design with smooth animations

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ba6yshark/PAV.git
cd PAV
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### Basic Controls

- **Draw Walls**: Click and drag on empty nodes to create walls
- **Move Start/End**: Click and drag the green (start) or red (end) nodes to reposition them
- **Clear Grid**: Removes all walls and resets the path
- **Clear Path**: Removes the visualized path but keeps walls

### Algorithms

1. Click on **Algorithms** in the navigation bar
2. Select an algorithm:
   - **Dijkstra**: Guaranteed shortest path, unweighted graph
   - **A***: Heuristic-based, often faster than Dijkstra
   - **BFS**: Breadth-first search, explores level by level
   - **DFS**: Depth-first search, explores as deep as possible
3. Click **Visualize** to see the algorithm in action

### Maze Generation

1. Click on **Wall Patterns**
2. Choose:
   - **Random Maze**: Generates a random maze pattern
   - **Recursive Maze**: Creates a maze using recursive division

### Speed Control

Adjust the animation speed from the **Speed** dropdown:
- **Fast**: 25ms per node
- **Average**: 50ms per node
- **Slow**: 100ms per node

## 🎨 Design Features

- **Frosted Glass UI**: Modern glassmorphism design with backdrop blur effects
- **Smooth Animations**: Nodes fill from the center with beautiful transitions
- **Responsive Layout**: Adapts to all screen sizes with mobile-friendly navigation
- **Color Coding**:
  - 🟢 Green: Start node
  - 🔴 Red: End node
  - 🔵 Blue: Visited nodes
  - 🟡 Yellow: Shortest path
  - ⬛ Black: Walls

## 🛠️ Technologies

- **React 18.2.0**: UI framework
- **CSS3**: Styling with modern features (backdrop-filter, animations)
- **Create React App**: Build tooling

## 📦 Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 🚢 Deployment

### Deploy to GitHub Pages

1. Make sure your code is committed and pushed:
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

2. Deploy:
```bash
npm run deploy
```

Your site will be available at: `https://ba6yshark.github.io/PAV`

**Note**: Make sure GitHub Pages is enabled in your repository settings (Settings → Pages → Source: `gh-pages` branch)

## 📱 Mobile Support

The app is fully responsive with:
- Hamburger menu for mobile navigation
- Touch-friendly controls
- Optimized grid sizing for smaller screens
- Draggable nodes work on touch devices

## 🧪 Testing

```bash
npm test
```

## 📝 Available Scripts

- `npm start`: Start development server
- `npm run build`: Create production build
- `npm test`: Run tests
- `npm run deploy`: Deploy to GitHub Pages
- `npm run predeploy`: Build before deployment (runs automatically)

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

This project is open source and available under the MIT License.

## 🔗 Links

- **Live Demo**: [https://ba6yshark.github.io/PAV](https://ba6yshark.github.io/PAV)
- **Repository**: [https://github.com/ba6yshark/PAV](https://github.com/ba6yshark/PAV)

---

Made with ❤️ using React
