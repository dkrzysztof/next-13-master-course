// create a random list of four elements that are strings
const randomList = Array.from({ length: 4 }, () => Math.floor(Math.random() * 100));

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<ul data-testid="products-list">
				{randomList.map((item, index) => (
					<li key={index}>{item}</li>
				))}
			</ul>
		</main>
	);
}
 