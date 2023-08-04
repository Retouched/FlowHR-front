export function checkRole(store, router) {
  const user = store.getState().user.value;
  const hasRole = user.role;

  // si l'user est sur le dashboard manager
  if (router.pathname.includes("/dashboard/manager")) {
    // si l'user a un role,
    if (hasRole) {
      // si ce role est manager le laissé continuer
      if (hasRole === "Manager") {
      } else {
        // si le role n'est pas manager, le redirige vers le dashboard de son role
        location.href = "/dashboard/" + hasRole.toLowerCase();
      }
      // si l'user n'a pas de role, redirectrion vers signin
    } else {
      location.href = "/";
    }
  }

  if (router.pathname.includes("/dashboard/directeur")) {
    if (hasRole) {
      if (hasRole === "Directeur") {
      } else {
        location.href = "/dashboard/" + hasRole.toLowerCase();
      }
    } else {
      location.href = "/";
    }
  }

  if (router.pathname.includes("/dashboard/rh")) {
    if (hasRole) {
      if (hasRole === "RH") {
      } else {
        location.href = "/dashboard/" + hasRole.toLowerCase();
      }
    } else {
      location.href = "/";
    }
  }

  // si l'user est sur le signin
  if (router.pathname === "/") {
    // si l'user a un role, redirection vers le dashboard selon son role
    if (hasRole) {
      location.href = "/dashboard/" + hasRole.toLowerCase();
    }
  }
}
