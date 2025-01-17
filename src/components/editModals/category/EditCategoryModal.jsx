import React,{useState} from 'react'

const EditCategoryModal = ({category,onSave,onClose}) => {
    const [name, setName] = useState(category.name);
    const [slug, setSlug] = useState(category.slug);

      const handleSave = () => {
        onSave(category._id, name, slug);
      };

 return (
   <div className="modal">
     <div className="modal-content">
       <span className="close" onClick={onClose}>
         &times;
       </span>
       <h2>Edit Category</h2>
       <div>
         <label>Name:</label>
         <input
           type="text"
           value={name}
           onChange={(e) => setName(e.target.value)}
         />
       </div>
       <div>
         <label>Slug:</label>
         <input
           type="text"
           value={slug}
           onChange={(e) => setSlug(e.target.value)}
         />
       </div>
       <button onClick={handleSave}>Save</button>
     </div>
   </div>
 );
}

export default EditCategoryModal
