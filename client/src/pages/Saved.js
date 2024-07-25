import SavedRecipes from "../components/SavedRecipes"



export default function Saved({ user }) {
    return (
        <div>
            <SavedRecipes user={ user }/>
        </div>
    )
}