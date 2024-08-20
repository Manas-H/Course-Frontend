import "./App.css";
import CreateCourse from "./components/AddCourse";
import AddCourseInstance from "./components/AddCourseInstance";
import ListCourses from "./components/ListCourse";
import ListInstance from "./components/ListInstance";

function App() {
  return (
    <div className="App">
      <div className="flex items-center justify-around mt-20">
        <CreateCourse />
        <AddCourseInstance />
      </div>
      <div>
        <ListCourses />
        <ListInstance />
      </div>
    </div>
  );
}

export default App;
