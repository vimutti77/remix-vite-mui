import { Button, Typography } from '@mui/material'
import { BarChart } from '@mui/x-charts'
import type { MetaFunction } from "@remix-run/node"

export const meta: MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export default function Index() {
	return (
		<div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
			<Typography variant='h5'>Welcome to Remix</Typography>
			<Button variant='outlined'>Test</Button>
			<BarChart
				series={[
					{ data: [35, 44, 24, 34] },
					{ data: [51, 6, 49, 30] },
					{ data: [15, 25, 30, 50] },
					{ data: [60, 50, 15, 25] },
				]}
				height={290}
				xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
				margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
			/>
		</div>
	);
}
