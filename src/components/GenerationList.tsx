import useGeneration from "../hooks/useGeneration";

const GenerationList = () => {
  const { generation } = useGeneration();

  return (
    <ul>
      {generation.map((gen) => (
        <li key={gen.id}>
          {gen.names.find(({ language }) => language.name === "en")?.name}
        </li>
      ))}
    </ul>
  );
};

export default GenerationList;
