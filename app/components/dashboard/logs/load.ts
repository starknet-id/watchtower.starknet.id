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
      const targetType = wholeTargetTypesTree[index];
      let found = false;
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

  request("/get_logs", {
    token: token,
    target_apps: targetServiceIds.length
      ? targetServiceIds
      : services.map((service) => service._id),
    target_types:
      wholeTargetTypesTree.length > 0
        ? wholeTargetTypesTree.map((t) => t.name)
        : undefined,
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
