import React, { useState } from 'react';
import { config } from '../config';

export default function Gallery() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const currentProject = selectedProject
    ? config.galleryProjects.find(p => p.folder === selectedProject)
    : null;

  return (
    <section id="gallery" className="section gallery-section">
      <div className="container">
        <h2 className="section-title">Our Projects</h2>
        <p className="section-subtitle">Explore our completed landscape and garden projects</p>

        {!selectedProject ? (
          <div className="gallery-grid">
            {config.galleryProjects.map((project) => (
              <div
                key={project.folder}
                className="gallery-project-card"
                onClick={() => setSelectedProject(project.folder)}
              >
                <div className="project-thumbnail">
                  <img
                    src={`/images/gallery/${project.folder}/1.png`}
                    alt={project.name}
                    loading="lazy"
                  />
                  <div className="project-overlay">
                    <h3>{project.name}</h3>
                    <p>{project.imageCount} photos</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="project-detail">
            <button
              className="back-button"
              onClick={() => setSelectedProject(null)}
            >
              ← Back to Projects
            </button>
            <h3 className="project-name">{currentProject?.name}</h3>
            <div className="project-images-grid">
              {Array.from({ length: currentProject?.imageCount || 0 }, (_, i) => (
                <div
                  key={i}
                  className="project-image-item"
                  onClick={() => setLightboxImage(`/images/gallery/${selectedProject}/${i + 1}.png`)}
                >
                  <img
                    src={`/images/gallery/${selectedProject}/${i + 1}.png`}
                    alt={`${currentProject?.name} - Image ${i + 1}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {lightboxImage && (
          <div
            className="lightbox"
            onClick={() => setLightboxImage(null)}
          >
            <button
              className="lightbox-close"
              onClick={() => setLightboxImage(null)}
            >
              ✕
            </button>
            <img src={lightboxImage} alt="Fullscreen view" />
          </div>
        )}
      </div>

      <style>{`
        .gallery-section {
          padding: 80px 20px;
          background: #f9f9f9;
        }

        .gallery-section .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-title {
          font-size: 2.5rem;
          text-align: center;
          margin-bottom: 10px;
          color: var(--brand);
        }

        .section-subtitle {
          text-align: center;
          color: #666;
          margin-bottom: 50px;
          font-size: 1.1rem;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
        }

        .gallery-project-card {
          cursor: pointer;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          transition: transform 0.3s, box-shadow 0.3s;
          background: white;
        }

        .gallery-project-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }

        .project-thumbnail {
          position: relative;
          width: 100%;
          aspect-ratio: 4/3;
          overflow: hidden;
        }

        .project-thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s;
        }

        .gallery-project-card:hover .project-thumbnail img {
          transform: scale(1.1);
        }

        .project-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
          color: white;
          padding: 20px;
        }

        .project-overlay h3 {
          margin: 0 0 5px 0;
          font-size: 1.5rem;
        }

        .project-overlay p {
          margin: 0;
          opacity: 0.9;
          font-size: 0.9rem;
        }

        .project-detail {
          animation: fadeIn 0.3s;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .back-button {
          background: var(--brand);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          margin-bottom: 30px;
          transition: background 0.3s;
        }

        .back-button:hover {
          background: #236328;
        }

        .project-name {
          font-size: 2rem;
          color: var(--brand);
          margin-bottom: 30px;
          text-align: center;
        }

        .project-images-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
        }

        .project-image-item {
          aspect-ratio: 4/3;
          overflow: hidden;
          border-radius: 8px;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: transform 0.3s;
        }

        .project-image-item:hover {
          transform: scale(1.05);
        }

        .project-image-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .lightbox {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.95);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 0.3s;
        }

        .lightbox img {
          max-width: 90%;
          max-height: 90%;
          object-fit: contain;
          border-radius: 8px;
        }

        .lightbox-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: white;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          font-size: 1.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s;
        }

        .lightbox-close:hover {
          background: #f0f0f0;
        }

        @media (max-width: 768px) {
          .gallery-section {
            padding: 60px 15px;
          }

          .section-title {
            font-size: 2rem;
          }

          .gallery-grid {
            grid-template-columns: 1fr;
          }

          .project-images-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}