# Math Pyramid Prison Puzzle 🔺

A captivating prison-themed mathematical pyramid puzzle game built with React. Challenge your mathematical skills by manipulating pyramid blocks with various operations to reach target values.

![Math Pyramid Game](https://img.shields.io/badge/React-18.2.0-blue?logo=react) ![License](https://img.shields.io/badge/License-MIT-green) ![Status](https://img.shields.io/badge/Status-Complete-brightgreen)

## 🎮 Game Overview

The Math Pyramid Prison Puzzle is an engaging mathematical game where players interact with triangular pyramid blocks arranged in a pyramid formation. Each block contains mathematical operations and numbers. The goal is to strategically select blocks to achieve a specific target value.

### Key Features

- **Prison Theme**: Dark stone/concrete textured background with atmospheric lighting
- **Golden UI Elements**: Metallic golden borders, titles, and interactive elements
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Interactive Pyramid**: Triangular blocks with hover effects and selection feedback
- **Mathematical Operations**: Addition, subtraction, multiplication, and division
- **Dynamic Gameplay**: Randomly generated puzzles with varying difficulty
- **Win Detection**: Automatic celebration when target is reached

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/theRubberDuckiee/math-pyramid.git
cd math-pyramid
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## 🎯 How to Play

1. **Objective**: Reach the target value displayed on the right side of the screen
2. **Interaction**: Click on pyramid blocks to select them
3. **Mathematics**: Each block contains an operation and number that affects your current total
4. **Strategy**: Plan your moves carefully to reach the exact target value
5. **Victory**: When you reach the target, a celebration message will appear
6. **New Game**: Click the "New Game" button to start a fresh puzzle

## 🏗️ Project Structure

```
src/
├── components/
│   ├── MathPyramid.js      # Main game component
│   ├── MathPyramid.css     # Styling for the pyramid game
│   └── index.js            # Component exports
├── utils/
│   └── mathHelpers.js      # Mathematical utility functions
├── App.js                  # Main application component
├── App.css                 # Application-level styles
├── index.js                # Application entry point
└── index.css               # Global styles and background textures
```

## 🎨 Design Features

### Visual Elements
- **Background**: Multi-layered stone/concrete texture with subtle animations
- **Typography**: Bold golden text with glow effects and text shadows
- **Blocks**: Triangular pyramid shapes with 3D hover effects
- **Borders**: Animated golden borders with shimmer effects
- **Color Scheme**: Dark grays and blacks with golden accents (#d4af37, #ffd700)

### Responsive Breakpoints
- **Desktop**: Full-size layout with side-by-side pyramid and target
- **Mobile (≤768px)**: Stacked layout with smaller blocks and adjusted typography

## 🔧 Technical Implementation

### Technologies Used
- **React**: Component-based UI framework
- **CSS3**: Advanced styling with gradients, shadows, and animations
- **Flexbox**: Responsive layout management
- **CSS Clip-path**: Triangular pyramid block shapes
- **CSS Animations**: Shimmer effects, glows, and transitions

### Key Components

#### MathPyramid Component
- Manages game state and logic
- Generates random mathematical puzzles
- Handles user interactions and win conditions
- Renders the pyramid layout and target display

#### Mathematical Operations
- Addition (+)
- Subtraction (-)
- Multiplication (×)
- Division (÷)

## 🎮 Game Mechanics

### Puzzle Generation
- Random target values between 1-100
- Balanced mix of mathematical operations
- Strategic placement of numbers for optimal difficulty

### User Experience
- Smooth hover animations and feedback
- Clear visual hierarchy with golden highlights
- Intuitive click-to-select interaction
- Immediate feedback on current progress

## 📱 Responsive Design

The game automatically adapts to different screen sizes:

- **Desktop**: Horizontal layout with full-size elements
- **Tablet**: Adjusted spacing and element sizes
- **Mobile**: Vertical stack layout with optimized touch targets

## 🚀 Deployment

To build for production:

```bash
npm run build
```

The optimized build will be available in the `build/` directory.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines
1. Follow existing code style and structure
2. Test thoroughly on different screen sizes
3. Maintain the prison theme aesthetic
4. Ensure mathematical accuracy

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Future Enhancements

- [ ] Multiple difficulty levels
- [ ] Score tracking and leaderboards
- [ ] Sound effects and music
- [ ] Additional mathematical operations
- [ ] Hint system for challenging puzzles
- [ ] Achievement system
- [ ] Multiplayer competitions

## 👤 Author

**theRubberDuckiee**
- GitHub: [@theRubberDuckiee](https://github.com/theRubberDuckiee)

## 🙏 Acknowledgments

- Inspired by classic mathematical puzzle games
- Prison aesthetic influenced by atmospheric game design
- Built with modern React best practices

---

**Ready to escape through mathematics? Start playing now! 🔺✨**

