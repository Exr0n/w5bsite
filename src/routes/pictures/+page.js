export async function load({ params }) {
    const paths = import.meta.glob("$lib/pictures/*.jpeg", { eager: true });

    return { paths }
}