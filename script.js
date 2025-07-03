// Building Regulations Compliance Tracker
// Main JavaScript File

console.log('Building Regulations Tracker - Starting initialization...');

// ==========================================
// GLOBAL VARIABLES AND DATA
// ==========================================

const approvedDocuments = {
    "A": {
        title: "Structure",
        requirements: [
            "A1 - Loading: All loads acting on the building must be safely transmitted to the ground",
            "A2 - Ground movement: Precautions must be taken to prevent damage from ground movement",
            "A3 - Disproportionate collapse: Buildings must be designed to avoid progressive collapse"
        ]
    },
    "B": {
        title: "Fire Safety", 
        requirements: [
            "B1 - Means of warning and escape: Adequate means of escape must be provided",
            "B2 - Internal fire spread (linings): Wall and ceiling linings must resist fire spread",
            "B3 - Internal fire spread (structure): Structure must maintain stability during fire",
            "B4 - External fire spread: External walls must resist fire spread to adjoining buildings",
            "B5 - Access and facilities for fire service: Adequate access for fire brigade"
        ]
    },
    "C": {
        title: "Site Preparation and Resistance to Contaminants",
        requirements: [
            "C1 - Preparation of site and resistance to contaminants: Site must be prepared properly",
            "C2 - Dangerous and offensive substances: Protection from methane and other gases"
        ]
    },
    "D": {
        title: "Toxic Substances",
        requirements: [
            "D1 - Cavity insulation: Insulation materials must not give off toxic gases"
        ]
    },
    "E": {
        title: "Resistance to the Passage of Sound",
        requirements: [
            "E1 - Protection against sound within dwelling-houses: Adequate sound insulation between rooms",
            "E2 - Protection against sound from other parts of building: Sound insulation between dwellings",
            "E3 - Reverberation in common areas: Control of reverberation in common spaces",
            "E4 - Acoustic conditions in schools: Specific acoustic requirements for educational buildings"
        ]
    },
    "F": {
        title: "Ventilation",
        requirements: [
            "F1 - Means of ventilation: Adequate ventilation must be provided to all spaces",
            "F2 - Condensation in roofs: Measures to prevent condensation in roof spaces"
        ]
    },
    "G": {
        title: "Sanitation, Hot Water Safety and Water Efficiency",
        requirements: [
            "G1 - Cold water supply: Adequate supply of wholesome water",
            "G2 - Water efficiency: Water consumption must not exceed specified limits",
            "G3 - Hot water supply and systems: Safe hot water systems",
            "G4 - Sanitary conveniences: Adequate sanitary facilities",
            "G5 - Bathrooms: Adequate bathing facilities"
        ]
    },
    "H": {
        title: "Drainage and Waste Disposal",
        requirements: [
            "H1 - Foul water drainage: Adequate drainage of foul water",
            "H2 - Wastewater treatment systems: On-site treatment systems",
            "H3 - Rainwater drainage: Adequate surface water drainage",
            "H4 - Building over sewers: Requirements for building over existing sewers",
            "H5 - Separate systems of drainage: Separate foul and surface water systems",
            "H6 - Solid waste storage: Adequate facilities for waste storage"
        ]
    },
    "J": {
        title: "Combustion Appliances and Fuel Storage Systems",
        requirements: [
            "J1 - Air supply: Adequate air supply for combustion appliances",
            "J2 - Discharge of products of combustion: Safe removal of combustion products",
            "J3 - Protection of building: Protection from heat and fire from appliances",
            "J4 - Provision of information: Information about appliance installation and maintenance"
        ]
    },
    "K": {
        title: "Protection from Falling, Collision and Impact",
        requirements: [
            "K1 - Stairs, ladders and ramps: Safe design of stairs and ramps",
            "K2 - Protection from falling: Barriers and guarding to prevent falls",
            "K3 - Vehicle barriers and loading bays: Protection from vehicle impact",
            "K4 - Protection against impact with glazing: Safe glazing in critical locations"
        ]
    },
    "L": {
        title: "Conservation of Fuel and Power",
        requirements: [
            "L1 - Conservation of fuel and power in dwellings: Energy efficiency in new dwellings",
            "L2 - Conservation of fuel and power in buildings other than dwellings: Energy efficiency in non-domestic buildings"
        ]
    },
    "M": {
        title: "Access to and Use of Buildings",
        requirements: [
            "M1 - Access and use: Buildings must be accessible to disabled people",
            "M2 - Access to extensions to buildings other than dwellings: Accessibility of extensions",
            "M3 - Sanitary conveniences: Accessible toilet facilities",
            "M4 - Accessible and adaptable dwellings: Categories of accessible housing"
        ]
    },
    "N": {
        title: "Glazing",
        requirements: [
            "N1 - Protection against impact: Safe glazing materials and locations",
            "N2 - Manifestation of glazing: Making glazing visible to prevent collisions"
        ]
    },
    "P": {
        title: "Electrical Safety",
        requirements: [
            "P1 - Design, installation, inspection and testing: Safe electrical installations"
        ]
    },
    "Q": {
        title: "Security in Dwellings",
        requirements: [
            "Q1 - Unauthorised access: Doors and windows must resist unauthorised access",
            "Q2 - Glazing: Security glazing requirements for doors and windows"
        ]
    },
    "R": {
        title: "Infrastructure for Electronic Communications",
        requirements: [
            "R1 - In-building physical infrastructure: Adequate infrastructure for electronic communications"
        ]
    },
    "S": {
        title: "Infrastructure for Charging Electric Vehicles",
        requirements: [
            "S1 - Electric vehicle charge points: Provision of charging infrastructure for electric vehicles"
        ]
    },
    "T": {
        title: "Toilet Accommodation",
        requirements: [
            "T1 - Toilet accommodation in non-domestic buildings: Adequate toilet facilities in commercial buildings"
        ]
    },
    "7": {
        title: "Material and Workmanship",
        requirements: [
            "7.1 - Materials and workmanship: All materials and workmanship must be of adequate quality",
            "7.2 - Short-lived materials: Materials with limited lifespan must be accessible for maintenance"
        ]
    }
};

let complianceData = {};
let pdfLibraryLoaded = false;

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function showError(message) {
    console.error('Error:', message);
    const errorDiv = document.getElementById('errorMessage');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
    }
}

function showSuccess(message) {
    console.log('Success:', message);
    const successDiv = document.getElementById('successMessage');
    if (successDiv) {
        successDiv.textContent = message;
        successDiv.style.display = 'block';
        setTimeout(() => {
            successDiv.style.display = 'none';
        }, 3000);
    }
}

function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    return input.replace(/[<>]/g, '').trim();
}

// Auto-resize textarea function
function autoResizeTextarea(textarea) {
    if (!textarea) return;
    
    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = 'auto';
    
    // Set height based on scroll height, with minimum height
    const minHeight = 60; // Minimum height in pixels
    const newHeight = Math.max(minHeight, textarea.scrollHeight);
    
    textarea.style.height = newHeight + 'px';
}

// Setup auto-resize for a textarea
function setupTextareaAutoResize(textarea) {
    if (!textarea) return;
    
    // Auto-resize on input
    textarea.addEventListener('input', function() {
        autoResizeTextarea(this);
    });
    
    // Auto-resize on paste
    textarea.addEventListener('paste', function() {
        // Use setTimeout to allow paste content to be processed
        setTimeout(() => {
            autoResizeTextarea(this);
        }, 10);
    });
    
    // Auto-resize on focus (in case content was set programmatically)
    textarea.addEventListener('focus', function() {
        autoResizeTextarea(this);
    });
    
    // Initial resize
    autoResizeTextarea(textarea);
}

// Setup auto-resize for all comment textareas
function setupAllTextareasAutoResize() {
    const textareas = document.querySelectorAll('textarea[id^="comments"]');
    textareas.forEach(textarea => {
        setupTextareaAutoResize(textarea);
    });
}

// ==========================================
// MAIN APPLICATION FUNCTIONS
// ==========================================

function init() {
    try {
        console.log('Initializing application...');
        generateApprovedDocsHTML();
        loadData();
        updateSummary();
        checkPDFLibrary();
        console.log('Application initialized successfully');
    } catch (error) {
        showError('Failed to initialize application: ' + error.message);
        console.error('Initialization error:', error);
    }
}

function checkPDFLibrary() {
    try {
        if (typeof window.jspdf !== 'undefined') {
            pdfLibraryLoaded = true;
            document.getElementById('pdfStatus').textContent = 'Ready';
            document.getElementById('pdfBtn').disabled = false;
            console.log('PDF library loaded successfully');
        } else {
            pdfLibraryLoaded = false;
            document.getElementById('pdfBtn').disabled = true;
            document.getElementById('pdfStatus').textContent = 'PDF library not loaded';
            console.warn('PDF library not available');
        }
    } catch (error) {
        console.error('Error checking PDF library:', error);
    }
}

function generateApprovedDocsHTML() {
    try {
        console.log('Generating HTML for approved documents...');
        let html = '';
        
        for (const [docKey, doc] of Object.entries(approvedDocuments)) {
            html += `<div class="approved-doc">`;
            html += `<div class="doc-header" onclick="toggleDoc('${docKey}')">Approved Document ${docKey} - ${doc.title}</div>`;
            html += `<div class="doc-content" id="doc-${docKey}">`;
            
            doc.requirements.forEach((requirement, i) => {
                const reqId = `${docKey}-${i}`;
                html += generateRequirementHTML(reqId, requirement);
            });
            
            html += `</div></div>`;
        }
        
        document.getElementById('approvedDocs').innerHTML = html;
        
        // Setup auto-resize for all textareas after DOM is updated
        setupAllTextareasAutoResize();
        
        console.log('HTML generation completed');
    } catch (error) {
        showError('Failed to generate HTML: ' + error.message);
        console.error('HTML generation error:', error);
    }
}

function generateRequirementHTML(reqId, requirement) {
    return `
        <div class="requirement" id="req-${reqId}">
            <div class="requirement-text">${requirement}</div>
            <div class="compliance-area">
                <select class="compliance-select" id="status-${reqId}" onchange="updateCompliance('${reqId}')">
                    <option value="">Select Status</option>
                    <option value="compliant">Compliant</option>
                    <option value="not-compliant">Not Compliant</option>
                    <option value="not-applicable">Not Applicable</option>
                </select>
                
                <div class="comment-section">
                    <div class="comment-title">Standards Used:</div>
                    <textarea class="compliance-text auto-resize" id="comments-${reqId}" 
                            placeholder="List the relevant standards, codes, and regulations used to address this requirement..." 
                            onchange="updateCompliance('${reqId}')" maxlength="2000"></textarea>
                </div>
                
                <div class="comment-section">
                    <div class="comment-title">Compliance Pathway:</div>
                    <textarea class="compliance-text auto-resize" id="comments2-${reqId}" 
                            placeholder="Describe the method or approach taken to achieve compliance with this requirement..." 
                            onchange="updateCompliance('${reqId}')" maxlength="2000"></textarea>
                </div>
                
                <div class="comment-section">
                    <div class="comment-title">Compliance Evidence:</div>
                    <textarea class="compliance-text auto-resize" id="comments3-${reqId}" 
                            placeholder="Reference drawings, calculations, specifications, test results, or other evidence demonstrating compliance..." 
                            onchange="updateCompliance('${reqId}')" maxlength="2000"></textarea>
                </div>
            </div>
        </div>`;
}

function toggleDoc(docKey) {
    try {
        const content = document.getElementById(`doc-${docKey}`);
        if (content) {
            content.classList.toggle('open');
        }
    } catch (error) {
        console.error('Error toggling document:', error);
    }
}

function updateCompliance(reqId) {
    try {
        const statusElement = document.getElementById(`status-${reqId}`);
        const commentsElement = document.getElementById(`comments-${reqId}`);
        const comments2Element = document.getElementById(`comments2-${reqId}`);
        const comments3Element = document.getElementById(`comments3-${reqId}`);
        const requirementElement = document.getElementById(`req-${reqId}`);
        
        if (!statusElement || !commentsElement || !requirementElement) {
            console.error(`Required elements not found for ${reqId}`);
            return;
        }
        
        const status = statusElement.value;
        const comments = sanitizeInput(commentsElement.value);
        const comments2 = sanitizeInput(comments2Element ? comments2Element.value : '');
        const comments3 = sanitizeInput(comments3Element ? comments3Element.value : '');
        
        // Update visual styling
        requirementElement.className = 'requirement';
        if (status) {
            requirementElement.classList.add(status);
        }
        
        // Save data
        complianceData[reqId] = {
            status: status,
            comments: comments,
            comments2: comments2,
            comments3: comments3
        };
        
        saveData();
        updateSummary();
    } catch (error) {
        console.error('Error updating compliance:', error);
    }
}

function updateSummary() {
    try {
        let total = 0;
        let compliant = 0;
        let notCompliant = 0;
        let notApplicable = 0;
        
        for (const [docKey, doc] of Object.entries(approvedDocuments)) {
            doc.requirements.forEach((_, i) => {
                const reqId = `${docKey}-${i}`;
                total++;
                
                if (complianceData[reqId] && complianceData[reqId].status) {
                    const status = complianceData[reqId].status;
                    if (status === 'compliant') compliant++;
                    else if (status === 'not-compliant') notCompliant++;
                    else if (status === 'not-applicable') notApplicable++;
                }
            });
        }
        
        const completed = compliant + notCompliant + notApplicable;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
        
        const summaryElement = document.getElementById('summaryText');
        if (summaryElement) {
            summaryElement.innerHTML = 
                `Progress: ${completed}/${total} (${percentage}%) | ` +
                `Compliant: ${compliant} | Not Compliant: ${notCompliant} | Not Applicable: ${notApplicable}`;
        }
    } catch (error) {
        console.error('Error updating summary:', error);
    }
}

// ==========================================
// PROJECT MANAGEMENT FUNCTIONS
// ==========================================

function saveProject() {
    try {
        const projectName = sanitizeInput(document.getElementById('projectName').value);
        const projectRef = sanitizeInput(document.getElementById('projectRef').value);
        const designerName = sanitizeInput(document.getElementById('designerName').value);
        
        const projectData = {
            name: projectName,
            ref: projectRef,
            designer: designerName,
            lastSaved: new Date().toISOString()
        };
        
        localStorage.setItem('projectData', JSON.stringify(projectData));
        showSuccess('Project details saved successfully!');
    } catch (error) {
        showError('Error saving project: ' + error.message);
    }
}

function saveData() {
    try {
        localStorage.setItem('complianceData', JSON.stringify(complianceData));
    } catch (error) {
        console.error('Error saving data:', error);
        if (error.name === 'QuotaExceededError') {
            showError('Storage quota exceeded. Please export your data.');
        }
    }
}

function loadData() {
    try {
        // Load project data
        const projectDataStr = localStorage.getItem('projectData');
        if (projectDataStr) {
            const projectData = JSON.parse(projectDataStr);
            const projectNameEl = document.getElementById('projectName');
            const projectRefEl = document.getElementById('projectRef');
            const designerNameEl = document.getElementById('designerName');
            
            if (projectNameEl) projectNameEl.value = projectData.name || '';
            if (projectRefEl) projectRefEl.value = projectData.ref || '';
            if (designerNameEl) designerNameEl.value = projectData.designer || '';
        }
        
        // Load compliance data
        const savedDataStr = localStorage.getItem('complianceData');
        if (savedDataStr) {
            complianceData = JSON.parse(savedDataStr);
            
            // Restore form states
            for (const [reqId, data] of Object.entries(complianceData)) {
                const statusSelect = document.getElementById(`status-${reqId}`);
                const commentsTextarea = document.getElementById(`comments-${reqId}`);
                const comments2Textarea = document.getElementById(`comments2-${reqId}`);
                const comments3Textarea = document.getElementById(`comments3-${reqId}`);
                const requirement = document.getElementById(`req-${reqId}`);
                
                if (statusSelect) statusSelect.value = data.status || '';
                if (commentsTextarea) {
                    commentsTextarea.value = data.comments || '';
                    // Auto-resize after setting content
                    autoResizeTextarea(commentsTextarea);
                }
                if (comments2Textarea) {
                    comments2Textarea.value = data.comments2 || '';
                    // Auto-resize after setting content
                    autoResizeTextarea(comments2Textarea);
                }
                if (comments3Textarea) {
                    comments3Textarea.value = data.comments3 || '';
                    // Auto-resize after setting content
                    autoResizeTextarea(comments3Textarea);
                }
                if (requirement && data.status) {
                    requirement.className = 'requirement ' + data.status;
                }
            }
        }
    } catch (error) {
        showError('Error loading data: ' + error.message);
        console.error('Load data error:', error);
    }
}

function clearAllData() {
    if (confirm('Are you sure you want to clear all project data and compliance information? This action cannot be undone.')) {
        try {
            localStorage.removeItem('projectData');
            localStorage.removeItem('complianceData');
            
            complianceData = {};
            
            document.getElementById('projectName').value = '';
            document.getElementById('projectRef').value = '';
            document.getElementById('designerName').value = '';
            
            loadData();
            updateSummary();
            
            showSuccess('All data cleared successfully!');
        } catch (error) {
            showError('Error clearing data: ' + error.message);
        }
    }
}

// ==========================================
// IMPORT/EXPORT FUNCTIONS
// ==========================================

function exportProjectData() {
    try {
        const projectDataStr = localStorage.getItem('projectData') || '{}';
        const complianceDataStr = localStorage.getItem('complianceData') || '{}';
        
        const allData = {
            projectData: JSON.parse(projectDataStr),
            complianceData: JSON.parse(complianceDataStr),
            exportDate: new Date().toISOString(),
            version: '1.1'
        };
        
        const dataStr = JSON.stringify(allData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        
        const projectName = allData.projectData.name || 'BuildingRegs';
        const safeName = projectName.replace(/[^a-z0-9]/gi, '_');
        const fileName = `${safeName}_${new Date().toISOString().split('T')[0]}.json`;
        link.download = fileName;
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        setTimeout(() => {
            URL.revokeObjectURL(link.href);
        }, 100);
        
        showSuccess(`Project data exported successfully as ${fileName}`);
        
    } catch (error) {
        showError('Error exporting data: ' + error.message);
    }
}

function importProjectData() {
    try {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = function(event) {
            const file = event.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const data = JSON.parse(e.target.result);
                    
                    if (data.projectData) {
                        localStorage.setItem('projectData', JSON.stringify(data.projectData));
                    }
                    if (data.complianceData) {
                        localStorage.setItem('complianceData', JSON.stringify(data.complianceData));
                    }
                    
                    showSuccess('Project data imported successfully!');
                    setTimeout(() => location.reload(), 1000);
                    
                } catch (error) {
                    showError('Error importing file: ' + error.message);
                }
            };
            
            reader.readAsText(file);
        };
        
        input.click();
    } catch (error) {
        showError('Error setting up file import: ' + error.message);
    }
}

function mergeProjectData() {
    try {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.multiple = true;
        
        input.onchange = function(event) {
            const files = Array.from(event.target.files);
            if (files.length === 0) return;
            
            showSuccess(`Selected ${files.length} files for merging. Processing...`);
            
            let processedFiles = 0;
            const mergeResults = [];
            
            files.forEach((file, index) => {
                const reader = new FileReader();
                reader.onload = function(e) {
                    try {
                        const data = JSON.parse(e.target.result);
                        mergeResults[index] = {
                            filename: file.name,
                            data: data,
                            success: true
                        };
                    } catch (error) {
                        mergeResults[index] = {
                            filename: file.name,
                            error: error.message,
                            success: false
                        };
                    }
                    
                    processedFiles++;
                    
                    if (processedFiles === files.length) {
                        performMerge(mergeResults);
                    }
                };
                
                reader.onerror = function() {
                    mergeResults[index] = {
                        filename: file.name,
                        error: 'File read error',
                        success: false
                    };
                    processedFiles++;
                    
                    if (processedFiles === files.length) {
                        performMerge(mergeResults);
                    }
                };
                
                reader.readAsText(file);
            });
        };
        
        input.click();
    } catch (error) {
        showError('Error setting up file merge: ' + error.message);
    }
}

function performMerge(mergeResults) {
    try {
        console.log('Starting merge process...', mergeResults);
        
        const currentProjectDataStr = localStorage.getItem('projectData') || '{}';
        const currentComplianceDataStr = localStorage.getItem('complianceData') || '{}';
        const currentProjectData = JSON.parse(currentProjectDataStr);
        const currentComplianceData = JSON.parse(currentComplianceDataStr);
        
        let mergeLog = [];
        let successfulMerges = 0;
        let failedMerges = 0;
        
        mergeResults.forEach(result => {
            if (!result.success) {
                mergeLog.push(`❌ ${result.filename}: ${result.error}`);
                failedMerges++;
                return;
            }
            
            const fileData = result.data;
            let fileMergeCount = 0;
            
            if (fileData.complianceData) {
                for (const [reqId, reqData] of Object.entries(fileData.complianceData)) {
                    if (reqData && (reqData.status || reqData.comments || reqData.comments2 || reqData.comments3)) {
                        const existing = currentComplianceData[reqId];
                        
                        if (!existing || !existing.status) {
                            currentComplianceData[reqId] = { ...reqData };
                            fileMergeCount++;
                        } else {
                            const merged = { ...existing };
                            
                            if (!merged.status && reqData.status) {
                                merged.status = reqData.status;
                            }
                            
                            if (reqData.comments && reqData.comments.trim()) {
                                if (merged.comments && merged.comments.trim()) {
                                    merged.comments += `\n\n[From ${result.filename}]\n${reqData.comments}`;
                                } else {
                                    merged.comments = `[From ${result.filename}]\n${reqData.comments}`;
                                }
                            }
                            
                            if (reqData.comments2 && reqData.comments2.trim()) {
                                if (merged.comments2 && merged.comments2.trim()) {
                                    merged.comments2 += `\n\n[From ${result.filename}]\n${reqData.comments2}`;
                                } else {
                                    merged.comments2 = `[From ${result.filename}]\n${reqData.comments2}`;
                                }
                            }
                            
                            if (reqData.comments3 && reqData.comments3.trim()) {
                                if (merged.comments3 && merged.comments3.trim()) {
                                    merged.comments3 += `\n\n[From ${result.filename}]\n${reqData.comments3}`;
                                } else {
                                    merged.comments3 = `[From ${result.filename}]\n${reqData.comments3}`;
                                }
                            }
                            
                            currentComplianceData[reqId] = merged;
                            fileMergeCount++;
                        }
                    }
                }
            }
            
            mergeLog.push(`✅ ${result.filename}: Merged ${fileMergeCount} requirements`);
            successfulMerges++;
        });
        
        const mergeInfo = {
            lastMerge: new Date().toISOString(),
            mergedFiles: mergeResults.filter(r => r.success).map(r => r.filename),
            mergeLog: mergeLog
        };
        
        if (!currentProjectData.mergeHistory) {
            currentProjectData.mergeHistory = [];
        }
        currentProjectData.mergeHistory.push(mergeInfo);
        
        localStorage.setItem('projectData', JSON.stringify(currentProjectData));
        localStorage.setItem('complianceData', JSON.stringify(currentComplianceData));
        
        complianceData = currentComplianceData;
        loadData();
        updateSummary();
        
        // Re-setup auto-resize for any new textareas after merge
        setupAllTextareasAutoResize();
        
        const summaryMessage = `Merge completed!\n✅ ${successfulMerges} files merged successfully\n❌ ${failedMerges} files failed\n\nDetailed log:\n${mergeLog.join('\n')}`;
        
        console.log('Merge Summary:', summaryMessage);
        showSuccess(`Merge completed! ${successfulMerges} files merged with ${Object.keys(currentComplianceData).length} total requirements updated.`);
        
        if (confirm('Merge completed successfully! Would you like to see the detailed merge log?')) {
            alert(summaryMessage);
        }
        
    } catch (error) {
        showError('Error during merge process: ' + error.message);
        console.error('Merge error:', error);
    }
}

// ==========================================
// REPORT GENERATION FUNCTIONS
// ==========================================

function generatePDFReport() {
    if (!pdfLibraryLoaded || typeof window.jspdf === 'undefined') {
        showError('PDF library is not loaded. Please check your internet connection.');
        return;
    }
    
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'mm', 'a4');
        
        const projectDataStr = localStorage.getItem('projectData') || '{}';
        const projectData = JSON.parse(projectDataStr);
        
        // Header
        doc.setFillColor(31, 78, 121);
        doc.rect(0, 0, 210, 40, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(18);
        doc.text('Building Regulations Compliance Report', 20, 20);
        doc.setFontSize(12);
        doc.text('Professional Compliance Assessment', 20, 30);
        
        doc.setTextColor(0, 0, 0);
        let yPos = 50;
        
        // Project info
        doc.setFontSize(12);
        doc.text(`Project: ${projectData.name || 'N/A'}`, 20, yPos);
        doc.text(`Reference: ${projectData.ref || 'N/A'}`, 20, yPos + 10);
        doc.text(`Designer: ${projectData.designer || 'N/A'}`, 20, yPos + 20);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 120, yPos);
        
        yPos += 40;
        
        // Requirements
        for (const [docKey, docData] of Object.entries(approvedDocuments)) {
            if (yPos > 250) {
                doc.addPage();
                yPos = 20;
            }
            
            doc.setFontSize(14);
            doc.setFont(undefined, 'bold');
            doc.text(`Approved Document ${docKey} - ${docData.title}`, 20, yPos);
            yPos += 10;
            
            docData.requirements.forEach((requirement, i) => {
                const reqId = `${docKey}-${i}`;
                const data = complianceData[reqId];
                
                if (yPos > 260) {
                    doc.addPage();
                    yPos = 20;
                }
                
                doc.setFontSize(10);
                doc.setFont(undefined, 'normal');
                
                const reqLines = doc.splitTextToSize(requirement, 170);
                doc.text(reqLines, 20, yPos);
                yPos += reqLines.length * 5;
                
                if (data) {
                    doc.text(`Status: ${data.status || 'Not assessed'}`, 25, yPos);
                    yPos += 5;
                    
                    if (data.comments) {
                        const commentLines = doc.splitTextToSize(`Standards Used: ${data.comments}`, 165);
                        doc.text(commentLines, 25, yPos);
                        yPos += commentLines.length * 5;
                    }
                    
                    if (data.comments2) {
                        const comment2Lines = doc.splitTextToSize(`Compliance Pathway: ${data.comments2}`, 165);
                        doc.text(comment2Lines, 25, yPos);
                        yPos += comment2Lines.length * 5;
                    }
                    
                    if (data.comments3) {
                        const comment3Lines = doc.splitTextToSize(`Compliance Evidence: ${data.comments3}`, 165);
                        doc.text(comment3Lines, 25, yPos);
                        yPos += comment3Lines.length * 5;
                    }
                } else {
                    doc.text('Status: Not assessed', 25, yPos);
                    yPos += 5;
                }
                
                yPos += 5;
            });
            
            yPos += 10;
        }
        
        const projectName = projectData.name || 'BuildingRegs';
        const safeName = projectName.replace(/[^a-z0-9]/gi, '_');
        const fileName = `${safeName}_Compliance_Report_${new Date().toISOString().split('T')[0]}.pdf`;
        doc.save(fileName);
        
        showSuccess(`PDF report generated successfully: ${fileName}`);
        
    } catch (error) {
        showError('Error generating PDF: ' + error.message);
        console.error('PDF generation error:', error);
    }
}

function generateReport() {
    try {
        const projectDataStr = localStorage.getItem('projectData') || '{}';
        const projectData = JSON.parse(projectDataStr);
        
        const html = generateReportHTML(projectData, false);
        
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(html);
            printWindow.document.close();
            printWindow.print();
        } else {
            showError('Please allow pop-ups to generate the print report.');
        }
    } catch (error) {
        showError('Error generating report: ' + error.message);
        console.error('Print report error:', error);
    }
}

function generateMergeReport() {
    try {
        const projectDataStr = localStorage.getItem('projectData') || '{}';
        const projectData = JSON.parse(projectDataStr);
        
        const html = generateReportHTML(projectData, true);
        
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(html);
            printWindow.document.close();
            
            setTimeout(() => {
                printWindow.print();
            }, 500);
        } else {
            showError('Please allow pop-ups to generate the final report.');
        }
    } catch (error) {
        showError('Error generating final report: ' + error.message);
        console.error('Final report error:', error);
    }
}

function generateReportHTML(projectData, isMergeReport) {
    let html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Building Regulations Compliance Report${isMergeReport ? ' - Final Merged Version' : ''}</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
            h1 { color: #1f4e79; border-bottom: 3px solid #1f4e79; padding-bottom: 10px; }
            h2 { color: #2d5a87; margin-top: 30px; }
            h3 { color: #333; }
            .compliant { background: #d4edda; padding: 10px; border-left: 4px solid #28a745; margin: 5px 0; }
            .not-compliant { background: #f8d7da; padding: 10px; border-left: 4px solid #dc3545; margin: 5px 0; }
            .not-applicable { background: #e2e3e5; padding: 10px; border-left: 4px solid #6c757d; margin: 5px 0; }
            .requirement { margin: 15px 0; padding: 10px; border: 1px solid #ddd; page-break-inside: avoid; }
            .comment-section { margin: 10px 0; padding: 8px; background: #f8f9fa; border-radius: 3px; }
            .merge-info { background: #fff3cd; padding: 15px; border: 1px solid #ffc107; border-radius: 5px; margin: 20px 0; }
            @media print { 
                .requirement { page-break-inside: avoid; }
                body { margin: 20px; }
            }
        </style>
    </head>
    <body>
        <h1>Building Regulations Compliance Report</h1>
        <div style="background: #e8f4fd; padding: 15px; border: 1px solid #d1ecf1; border-radius: 5px;">
            <p><strong>Project:</strong> ${projectData.name || 'N/A'}</p>
            <p><strong>Reference:</strong> ${projectData.ref || 'N/A'}</p>
            <p><strong>Designer:</strong> ${projectData.designer || 'N/A'}</p>
            <p><strong>Report Date:</strong> ${new Date().toLocaleDateString()}</p>
            ${isMergeReport ? '<p><strong>Report Type:</strong> Final Merged Compliance Report</p>' : ''}
        </div>
    `;
    
    // Add merge history if it's a merge report
    if (isMergeReport && projectData.mergeHistory && projectData.mergeHistory.length > 0) {
        html += '<div class="merge-info">';
        html += '<h3>📋 Merge History</h3>';
        html += '<p>This report contains merged data from multiple contributors:</p>';
        
        projectData.mergeHistory.forEach((merge, index) => {
            html += `<div style="margin: 10px 0; padding: 8px; background: white; border-radius: 3px;">`;
            html += `<strong>Merge ${index + 1}:</strong> ${new Date(merge.lastMerge).toLocaleString()}<br>`;
            html += `<strong>Files merged:</strong> ${merge.mergedFiles.join(', ')}<br>`;
            if (merge.mergeLog) {
                html += `<strong>Details:</strong><br>${merge.mergeLog.join('<br>')}`;
            }
            html += '</div>';
        });
        
        html += '</div>';
    }
    
    // Add summary if it's a merge report
    if (isMergeReport) {
        let totalReqs = 0;
        let compliantCount = 0;
        let notCompliantCount = 0;
        let notApplicableCount = 0;
        let assessedCount = 0;
        
        for (const [docKey, doc] of Object.entries(approvedDocuments)) {
            doc.requirements.forEach((_, i) => {
                const reqId = `${docKey}-${i}`;
                totalReqs++;
                
                if (complianceData[reqId] && complianceData[reqId].status) {
                    assessedCount++;
                    const status = complianceData[reqId].status;
                    if (status === 'compliant') compliantCount++;
                    else if (status === 'not-compliant') notCompliantCount++;
                    else if (status === 'not-applicable') notApplicableCount++;
                }
            });
        }
        
        html += `
        <div style="background: #d4edda; padding: 15px; border: 1px solid #c3e6cb; border-radius: 5px; margin: 20px 0;">
            <h3>📊 Compliance Summary</h3>
            <p><strong>Total Requirements:</strong> ${totalReqs}</p>
            <p><strong>Assessed:</strong> ${assessedCount} (${Math.round((assessedCount/totalReqs)*100)}%)</p>
            <p><strong>Compliant:</strong> ${compliantCount} | <strong>Non-Compliant:</strong> ${notCompliantCount} | <strong>Not Applicable:</strong> ${notApplicableCount}</p>
        </div>
        `;
    }
    
    // Add requirements
    for (const [docKey, doc] of Object.entries(approvedDocuments)) {
        html += `<h2>Approved Document ${docKey} - ${doc.title}</h2>`;
        
        doc.requirements.forEach((requirement, i) => {
            const reqId = `${docKey}-${i}`;
            const data = complianceData[reqId];
            
            html += '<div class="requirement">';
            html += `<h3>${requirement}</h3>`;
            
            if (data && data.status) {
                const statusClass = data.status || '';
                html += `<div class="${statusClass}">`;
                html += `<strong>Status:</strong> ${data.status || 'Not assessed'}<br>`;
                html += '</div>';
                
                if (data.comments && data.comments.trim()) {
                    html += '<div class="comment-section">';
                    html += `<strong>Standards Used:</strong><br>${data.comments.replace(/\n/g, '<br>')}`;
                    html += '</div>';
                }
                
                if (data.comments2 && data.comments2.trim()) {
                    html += '<div class="comment-section">';
                    html += `<strong>Compliance Pathway:</strong><br>${data.comments2.replace(/\n/g, '<br>')}`;
                    html += '</div>';
                }
                
                if (data.comments3 && data.comments3.trim()) {
                    html += '<div class="comment-section">';
                    html += `<strong>Compliance Evidence:</strong><br>${data.comments3.replace(/\n/g, '<br>')}`;
                    html += '</div>';
                }
            } else {
                html += '<p><em>Not assessed</em></p>';
            }
            
            html += '</div>';
        });
    }
    
    html += `
    <div style="margin-top: 40px; padding: 20px; background: #f8f9fa; border: 1px solid #ddd; border-radius: 5px;">
        <h3>📝 Report Information</h3>
        <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Application:</strong> Building Regulations Compliance Tracker</p>
        <p><strong>Version:</strong> 1.1 (Merge Capable)</p>
        ${isMergeReport ? '<p style="font-size: 0.9em; color: #666;">This report represents a comprehensive compilation of building regulations compliance assessments from multiple contributors.</p>' : ''}
    </div>
    </body></html>`;
    
    return html;
}

// ==========================================
// EVENT LISTENERS AND INITIALIZATION
// ==========================================

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing...');
    init();
});

// Check PDF library after delay
setTimeout(() => {
    checkPDFLibrary();
}, 2000);

// Global error handlers
window.addEventListener('error', function(event) {
    console.error('JavaScript error:', event.error);
    console.error('Error details:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
    });
});

window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
});