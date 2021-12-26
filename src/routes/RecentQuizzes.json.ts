

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params }) {

	const data = fetch(`https://rust-mongodb-backend.herokuapp.com/recent`, 
    {
      method: "GET",
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .catch(error => {
      console.log(error);
      return null;
    });

	if (data) {
		return {
			body: {
				data
			}
		};
	}
}