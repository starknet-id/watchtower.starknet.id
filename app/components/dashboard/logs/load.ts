import request from "@/app/utils/request";

const load = (
  token: string,
  loaded: boolean,
  targetServiceIds: string[],
  services: Service[],
  targetTypes: Type[],
  types: Type[],
  setLogs: (logs: Log[]) => void,
  setLoaded: (loaded: boolean) => void
) => {
  let wholeTargetTypesTree = [...targetTypes];

  const loadWholeTargetTypesTree = () => {
    // Find all child types of target types
    for (let index = 0; index < wholeTargetTypesTree.length; index++) {
      let found = false;
      const targetType = wholeTargetTypesTree[index];
      const childTypes = types.filter(
        (type) => type.parents.indexOf(targetType._id) !== -1
      );
      for (let index2 = 0; index2 < childTypes.length; index2++) {
        const childType = childTypes[index2];
        if (wholeTargetTypesTree.indexOf(childType) !== -1) found = true;
      }
      if (!found && childTypes.length) {
        wholeTargetTypesTree.push(...childTypes);
        loadWholeTargetTypesTree();
      }
    }
  };
  loadWholeTargetTypesTree();

  let leaves: Type[] = [];
  // Find leaves of the tree (types without children)
  for (let index = 0; index < wholeTargetTypesTree.length; index++) {
    const type = wholeTargetTypesTree[index];
    const childTypes = types.filter((t) => t.parents.indexOf(type._id) !== -1);
    if (childTypes.length === 0) leaves.push(type);
  }

  let resTargetTypeNames: string[] = [];
  // Generate paths for each leaf
  for (let index = 0; index < leaves.length; index++) {
    const leaf = leaves[index];
    let paths: string[] = [leaf._id];
    let result = "";
    while (!result) {
      for (let index = 0; index < paths.length; index++) {
        const path = paths[index];
        const currentElementId = path.split("/").pop();
        const currentElement = wholeTargetTypesTree.find(
          (type) => type._id === currentElementId
        );
        if (currentElement) {
          const parents = currentElement.parents;
          for (let index = 0; index < parents.length; index++) {
            const parent = parents[index];
            paths.push(path + "/" + parent);
          }
          if (parents.length === 0) result = path;
        }
        paths.splice(index, 1);
        index--;
      }
    }
    const path = result.split("/");
    let res = [];
    for (let index = 0; index < path.length; index++) {
      const elementId = path[index];
      const element = wholeTargetTypesTree.find(
        (type) => type._id === elementId
      );
      if (element) {
        res.push(element.name);
      }
    }
    resTargetTypeNames.push(res.reverse().join("/"));
  }

  request("/get_logs", {
    token: token,
    target_apps: targetServiceIds.length
      ? targetServiceIds
      : services.map((service) => service._id),
    target_types:
      resTargetTypeNames.length > 0 ? resTargetTypeNames : undefined,
  }).then((res) => {
    if (res.status === "success") {
      const services = res.logs;
      const result = [];
      // Put all logs in one array
      const keys = Object.keys(services);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const service = services[key];
        result.push(...service);
      }
      // Sort logs by timestamp
      result.sort((a, b) => b.timestamp - a.timestamp);
      setLogs(result);
    }
    if (!loaded) setLoaded(true);
  });
};

export default load;
