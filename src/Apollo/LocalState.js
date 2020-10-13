export const defaults = {
  isLoggedIn : Boolean(localStorage.getItem("token")) || false
};

export const resolvers = {
  Mutaion: {
    logUserIn: (_, {token}, {cache}) => {
      console.log("There~!!!!");
      localStorage.setItem("token", token);
      cache.writeData({
        data: {
          isLoggedIn : true
        }
      });
     
      return null;
    }, 
    logUserOut: (_, __, {cache}) => {
      localStorage.removeItem("token");
      window.location.reload();
      return null;
    }
  }
}