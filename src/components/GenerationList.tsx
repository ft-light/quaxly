import useGeneration from "../hooks/useGeneration";
import VersionGroupList from "./VersionGroupList";

const GenerationList = () => {
  const { generation } = useGeneration();

  return (
    <ul>
      {generation
        .map((gen) => (
          <li key={gen.id}>
            {gen.names.find(({ language }) => language.name === "en")?.name}
            <ul>
              <VersionGroupList version={gen.version_groups} />
            </ul>
          </li>
        ))
        .reverse()}
    </ul>
  );
};

export default GenerationList;
