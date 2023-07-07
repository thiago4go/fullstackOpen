const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};

const Content = (props) => {
  return (
    <>
      {props.course.parts.map((part) => (
        <Part
          key={part.id}
          part={part.name}
          exercises={part.exercises}
        />
      ))}
    </>
  );
};

const Total = (props) => {
  return (
    <>
      <p>
        <strong>
          {" "}
          Number of exercises{" "}
          {props.course.parts.reduce((sum, part) => sum + part.exercises, 0)}
        </strong>
      </p>
    </>
  );
};

const Course = (props) => {
  return (
    <>
      {props.course.map((course) => (
        <div key={course.id}>
          <h2>{course.name}</h2>
          <Content course={course} />
          <Total course={course} />
        </div>
      ))}
    </>
  );
};

export default Course;
