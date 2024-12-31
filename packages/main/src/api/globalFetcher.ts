  // SWR Fetcher functions

  const getFetcher = (url:string) => fetch(url).then((res) => {
    if(!res.ok){
      throw new Error("Failed to fetch data");
    }else{
      return res.json();
    }
  }).catch((error) => {
    throw new Error(error)
  });
  
  const postFetcher = (url: string, { arg }: { arg: any }) =>
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(arg),
    }).then((res) => {
      if (!res.ok) throw new Error('Something went wrong');
      return res.json();
    }).catch((error) => {
      throw new Error(error)
    });

    const deleteFetcher = (url: string, { arg }: { arg: any }) =>
      fetch(url, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(arg),
      }).then((res) => {
        if (!res.ok) {
          throw new Error('Failed to delete contact');
        }
        return res.json();
      }).catch((error) => {
        throw new Error(error)
      });
  
    const putFetcher = (url: string, { arg }: { arg: any }) =>
      fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(arg),
      }).then((res) => {
        if (!res.ok) {
          throw new Error('Failed to update contact');
        }
        return res.json();
      }).catch((error) => {
        throw new Error(error)
      });

      export {getFetcher , postFetcher, deleteFetcher, putFetcher};

