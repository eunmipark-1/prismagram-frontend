export const defaults = {
  isLoggedIn :localStorage.getItem("token")  !== null ? true : false
};

export const resolvers = {
  Mutaion: {
    logUserIn: (_, {token}, {cache}) => {
      console.log(token);
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