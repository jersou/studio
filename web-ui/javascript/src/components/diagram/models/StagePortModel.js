/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import StudioPortModel from "./StudioPortModel";
import ActionPortModel from "./ActionPortModel";


class StagePortModel extends StudioPortModel {

    constructor(label, inbound) {
        super('stage-port', label, inbound);
    }

    canLinkToPort(port) {
        return (
            port instanceof ActionPortModel             // A stage port must be linked to an action port
            && this.inbound !== port.inbound            // Make sure an outgoing port is linked to an incoming port
            && this.getParent() !== port.getParent()    // The source and target nodes of a link should not be on the same node
            && (                                        // Outgoing ports have a maximum of one link
                (this.inbound && Object.keys(port.getLinks()).length <= 1)
                || (!this.inbound && Object.keys(this.getLinks()).length <= 1)
            )
        );
    }

}

export default StagePortModel;